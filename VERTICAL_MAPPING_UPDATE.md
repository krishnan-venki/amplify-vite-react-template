# Backend Update Required: Add Vertical Attribute

## Changes Made to Frontend

The insight configuration now uses a `vertical` attribute from the API instead of `insight_type` to determine colors and icons.

### Vertical Mapping

| Vertical Value | Icon | Color | Usage |
|---------------|------|-------|-------|
| `sagaa_money` | DollarSign | Green (#10b981) | Financial insights |
| `sagaa_healthcare` | Heart | Pink/Red (#f43f5e) | Health insights |
| `sagaa_education` | GraduationCap | Blue (#3b82f6) | Education insights |
| `sagaa_lifeessentials` | Home | Orange (#f59e0b) | Life essentials insights |

## Backend Update Needed

Update your Lambda function's `store_insights()` function to include the `vertical` attribute:

```python
# In proactive_insights_lambda.py, update the store_insights function:

def store_insights(user_id, insights):
    """
    Store generated insights in DynamoDB
    Returns number of insights stored
    """
    print(f"[INFO] Storing {len(insights)} insights for user: {user_id}")
    
    try:
        table = dynamodb.Table(INSIGHTS_TABLE)
        stored_count = 0
        
        for insight in insights:
            # Generate unique insight ID
            insight_id = str(uuid.uuid4())
            timestamp = datetime.now().isoformat()
            
            # Determine vertical based on insight type or user context
            # For now, all insights default to money
            # TODO: Enhance LLM to return vertical classification
            vertical = 'sagaa_money'  # Default for financial insights
            
            # Build markdown content for display
            markdown_content = f"""## {insight['title']}

**What's Happening:**
{insight['what_happening']}

**Why It Matters:**
{insight['why_matters']}

**Recommended Actions:**
"""
            for i, action in enumerate(insight['actions'], 1):
                markdown_content += f"{i}. {action}\n"
            
            markdown_content += f"\n**Expected Impact:**\n{insight['expected_impact']}"
            
            # Create DynamoDB item
            item = {
                'PK': f"USER#{user_id}",
                'SK': f"INSIGHT#{timestamp}#{insight['type']}",
                'insight_id': insight_id,
                'insight_type': insight['type'],
                'vertical': vertical,  # ← ADD THIS LINE
                'priority': insight['priority'],
                'status': 'active',
                'title': insight['title'],
                'summary': insight['what_happening'][:200],  # Short summary
                'full_content': markdown_content,
                'raw_insight': insight,  # Store parsed structure
                'generated_at': timestamp,
                'expires_at': (datetime.now() + timedelta(days=30)).isoformat(),
                'viewed': False,
                'viewed_at': None,
                'dismissed': False,
                'dismissed_at': None
            }
            
            table.put_item(Item=item)
            stored_count += 1
            print(f"[INFO] Stored insight: {insight['title']}")
        
        print(f"[SUCCESS] Stored {stored_count} insights in DynamoDB")
        return stored_count
        
    except Exception as e:
        print(f"[ERROR] Failed to store insights: {e}")
        raise
```

## Future Enhancement

Later, you can enhance your LLM prompt to automatically classify insights into verticals:

```python
# Add to LLM prompt:
VERTICAL: [sagaa_money|sagaa_healthcare|sagaa_education|sagaa_lifeessentials]
```

Then parse it like you do for other fields:

```python
elif line.startswith('VERTICAL:'):
    insight['vertical'] = line.replace('VERTICAL:', '').strip().lower()
```

## Testing

1. Deploy updated Lambda function
2. Regenerate insights for a test user
3. Verify the `vertical` attribute is present in DynamoDB
4. Check frontend displays correct colors

## Result

All insights will now use consistent vertical colors:
- **Card background**: Light version of vertical color
- **Icon container**: Exact vertical gradient
- **Icon**: Consistent vertical icon (DollarSign for money, Heart for healthcare, etc.)
