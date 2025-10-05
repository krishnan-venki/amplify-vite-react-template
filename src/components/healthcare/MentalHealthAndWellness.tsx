import { useState } from 'react';
import heroImage from '../../assets/Mental Wellness.jpg';

export const MentalHealthAndWellness = () => {
    const [activeExample, setActiveExample] = useState<'mood' | 'therapy' | 'medication' | 'integration'>('integration');

    const examples = {
        mood: {
            title: 'Mood & Symptom Tracking',
            scenario: 'Understanding Your Patterns',
            insight: '"I\'ve noticed your mood logs show consistently lower scores on Sunday evenings. Looking at your calendar, you have fewer social plans on weekends. This pattern has appeared over the past 6 weeks. Would you like to proactively schedule activities or discuss this with Dr. Martinez at your next session?"',
            features: [
                'Daily mood check-ins with simple scales',
                'Pattern recognition across weeks and months',
                'Trigger identification (stress, sleep, exercise)',
                'Energy level and anxiety tracking',
                'Correlation with physical health metrics'
            ]
        },
        therapy: {
            title: 'Therapy & Counseling Coordination',
            scenario: 'Seamless Care Management',
            insight: '"Your therapy appointment with Dr. Martinez is tomorrow at 4 PM. Based on your mood logs this week, you might want to discuss: (1) the Sunday evening pattern we identified, (2) improved sleep quality after starting morning walks, (3) increased work stress from the project deadline. I\'ve prepared these talking points for you."',
            features: [
                'Appointment scheduling and reminders',
                'Session preparation with relevant patterns',
                'Progress tracking between sessions',
                'Homework and exercise reminders',
                'Insurance coverage verification'
            ]
        },
        medication: {
            title: 'Psychiatric Medication Management',
            scenario: 'Monitoring Effectiveness & Side Effects',
            insight: '"You started Lexapro 10mg three weeks ago. Your sleep data shows: Week 1 - deep sleep decreased 15% (common when starting SSRIs), Week 2-3 - recovering to baseline. Your mood logs show 40% improvement in anxiety symptoms. Your resting heart rate increased slightly (+3 bpm, within normal range). Overall, the medication appears to be working well with manageable initial side effects."',
            features: [
                'Medication adherence tracking',
                'Side effect monitoring with device data',
                'Mood correlation with medication changes',
                'Dosage adjustment timeline tracking',
                'Withdrawal symptom alerts if doses missed'
            ]
        },
        integration: {
            title: 'Mind-Body Integration',
            scenario: 'Holistic Health Intelligence',
            insight: '"Your HRV has been low this week (avg 38ms vs. your baseline 52ms), and your mood logs show increased anxiety. I also notice: (1) Sleep quality down 20%, (2) Exercise dropped from 4x to 1x this week, (3) Work calendar shows back-to-back meetings. Your body is showing stress signals. Recommendations: (1) 10-minute morning walk before work, (2) Block 30-min lunch break tomorrow, (3) Consider brief check-in with your therapist this week rather than waiting for your scheduled appointment."',
            features: [
                'HRV as stress indicator',
                'Sleep quality correlation with mood',
                'Exercise impact on mental health',
                'Work stress pattern detection',
                'Integrated recommendations across verticals'
            ]
        }
    };

    const currentExample = examples[activeExample];

    return (
        <section id="mental-health" style={{
            padding: '80px 0',
            background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)',
            color: '#1d1d1f',
        }}>
            <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 24px' }}>
                {/* Main Section */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center', marginBottom: '64px' }}>
                    <div>
                        <h2 style={{
                            fontWeight: '100',
                            color: '#6366f1',
                            marginBottom: '24px',
                            lineHeight: '1.3',
                            fontSize: 'clamp(36px, 4vw, 56px)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px'
                        }}>
                             Mental Health & Wellness
                        </h2>
                        <p style={{ fontSize: '22px', color: '#6b7280', lineHeight: '1.7', fontWeight: '300', marginBottom: '32px' }}>
                            Complete mental health support that connects mind and body. Track mood patterns, coordinate therapy, monitor medications, and understand how your mental health interacts with sleep, exercise, stress, and physical health metrics.
                        </p>

                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={heroImage} alt="Mental Health & Wellness" style={{ maxWidth: '100%', width: '420px', height: 'auto', borderRadius: '24px', boxShadow: '0 8px 32px rgba(99,102,241,0.12)' }} />
                    </div>
                </div>

                {/* Interactive Examples */}
                <div style={{ marginTop: '80px' }}>
                    <h3 style={{ fontSize: '32px', fontWeight: '600', color: '#1d1d1f', marginBottom: '16px', textAlign: 'center' }}>
                        How Sagaa Supports Your Mental Health
                    </h3>

                    {/* Example Tabs */}
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {(['integration', 'mood', 'therapy', 'medication'] as const).map((type) => (
                            <button
                                key={type}
                                onClick={() => setActiveExample(type)}
                                style={{
                                    padding: '12px 24px',
                                    borderRadius: '12px',
                                    border: activeExample === type ? '2px solid #6366f1' : '2px solid #e5e7eb',
                                    background: activeExample === type ? '#eef2ff' : 'white',
                                    color: activeExample === type ? '#6366f1' : '#6b7280',
                                    fontSize: '15px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {examples[type].title}
                            </button>
                        ))}
                    </div>

                    {/* Example Content */}
                    <div style={{
                        background: 'white',
                        borderRadius: '20px',
                        padding: '40px',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                        border: '1px solid #e5e7eb'
                    }}>
                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ fontSize: '14px', color: '#6366f1', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                {currentExample.scenario}
                            </div>
                            <h4 style={{ fontSize: '28px', fontWeight: '600', color: '#1d1d1f', marginBottom: '20px' }}>
                                {currentExample.title}
                            </h4>
                        </div>

                        <div style={{
                            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)',
                            borderLeft: '4px solid #6366f1',
                            borderRadius: '12px',
                            padding: '24px',
                            marginBottom: '32px',
                            fontSize: '16px',
                            lineHeight: '1.7',
                            color: '#1d1d1f',
                            fontStyle: 'italic'
                        }}>
                            {currentExample.insight}
                        </div>

                        <div>
                            <div style={{ fontSize: '16px', fontWeight: '600', color: '#1d1d1f', marginBottom: '16px' }}>
                                Key Capabilities:
                            </div>
                            <div style={{ display: 'grid', gap: '12px' }}>
                                {currentExample.features.map((feature, idx) => (
                                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                        <span style={{ color: '#10b981', fontSize: '20px', flexShrink: 0 }}>✓</span>
                                        <span style={{ color: '#4b5563', fontSize: '15px', lineHeight: '1.6' }}>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Why Integration Matters */}
                <div style={{ marginTop: '80px', background: 'white', borderRadius: '20px', padding: '48px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                    <h3 style={{ fontSize: '28px', fontWeight: '600', color: '#1d1d1f', marginBottom: '32px', textAlign: 'center' }}>
                        Why Mind-Body Integration Matters
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
                        <div>
                            <div style={{ fontSize: '32px', marginBottom: '12px' }}>💓</div>
                            <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#1d1d1f', marginBottom: '8px' }}>Physical Health Impacts Mental Health</h4>
                            <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: '1.6' }}>
                                Poor sleep, lack of exercise, and chronic stress directly affect mood, anxiety, and depression. Sagaa tracks these connections.
                            </p>
                        </div>
                        <div>
                            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🧘</div>
                            <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#1d1d1f', marginBottom: '8px' }}>Mental Health Impacts Physical Health</h4>
                            <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: '1.6' }}>
                                Anxiety and depression affect sleep quality, immune function, and chronic disease management. Sagaa sees the whole picture.
                            </p>
                        </div>
                        <div>
                            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📊</div>
                            <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#1d1d1f', marginBottom: '8px' }}>Data Reveals Patterns You Can't See</h4>
                            <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: '1.6' }}>
                                Wearable data (HRV, sleep, activity) combined with mood tracking reveals patterns invisible to patients and providers.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Crisis Support */}
                <div style={{ marginTop: '48px', background: '#fef3c7', border: '2px solid #fbbf24', borderRadius: '16px', padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                        <span style={{ fontSize: '24px' }}>⚠️</span>
                        <div>
                            <div style={{ fontSize: '16px', fontWeight: '600', color: '#92400e', marginBottom: '8px' }}>
                                Important: Crisis Support
                            </div>
                            <p style={{ fontSize: '14px', color: '#78350f', lineHeight: '1.6', marginBottom: '12px' }}>
                                Sagaa provides mental health support and coordination, but is <strong>not a substitute for professional mental health care</strong>. If you're experiencing a mental health crisis:
                            </p>
                            <div style={{ fontSize: '14px', color: '#78350f', lineHeight: '1.8' }}>
                                <div style={{ marginBottom: '6px' }}>
                                    <strong>988 Suicide & Crisis Lifeline:</strong> Call or text 988 (available 24/7)
                                </div>
                                <div style={{ marginBottom: '6px' }}>
                                    <strong>Crisis Text Line:</strong> Text "HELLO" to 741741
                                </div>
                                <div>
                                    <strong>Emergency:</strong> Call 911 or go to your nearest emergency room
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};