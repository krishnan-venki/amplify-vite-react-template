import { useState, useEffect } from 'react';

interface Review {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Maria Chen",
    role: "Small Business Owner & Parent",
    content: "Sagaa connected the dots I didn't even know existed. When my son's allergy appointment came up, it automatically adjusted our grocery budget and suggested in-network providers. Having my finances, health, and family calendar all work together has been transformative.",
    rating: 5
  },
  {
    id: 2,
    name: "David Thompson",
    role: "Freelance Consultant",
    content: "Managing irregular income was always stressful until Sagaa. It predicts my cash flow, optimizes my quarterly taxes, and even found me $1,200 in annual savings through bill negotiations. The community marketplace connected me with an accountant who specializes in freelancers—game changer.",
    rating: 5
  },
  {
    id: 3,
    name: "Jennifer Park",
    role: "Working Professional",
    content: "I was juggling 8 different apps for budgeting, health tracking, meal planning, and insurance. Sagaa unified everything into one ecosystem that actually understands how my life connects. It's like having a brilliant personal assistant who knows me.",
    rating: 5
  },
  {
    id: 4,
    name: "Robert Martinez",
    role: "Retiree & Caregiver",
    content: "Caring for my aging parents while managing my own health and finances felt overwhelming. Sagaa tracks medications for all three of us, coordinates appointments, monitors our budgets, and even connects us with trusted community helpers. Peace of mind is priceless.",
    rating: 5
  },
  {
    id: 5,
    name: "Sarah Williams",
    role: "Graduate Student",
    content: "Between student loans, part-time work, health insurance complications, and planning my education path, I felt lost. Sagaa showed me cross-connections I never saw—like how my gym membership affects both my health goals and student budget. The community insights helped me refinance my loans and save $4K.",
    rating: 5
  },
  {
    id: 6,
    name: "Michael Foster",
    role: "Family of Four",
    content: "Sagaa is the central nervous system for our household. It manages our kids' school activities and health checkups, optimizes our family budget, coordinates our home maintenance, and even helps us plan educational milestones. We finally feel in control of our family's interconnected life.",
    rating: 5
  }
];

export default function ReviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 8000); // Auto-advance every 8 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
      setIsTransitioning(false);
    }, 300);
  };

  const handleDotClick = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 300);
  };

  const currentReview = reviews[currentIndex];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      padding: '48px',
      color: '#1f2937'
    }}>
      <div style={{
        maxWidth: '600px',
        textAlign: 'center'
      }}>
        {/* Stars */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '24px',
          opacity: isTransitioning ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out'
        }}>
          {[...Array(currentReview.rating)].map((_, i) => (
            <svg
              key={i}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ color: '#fbbf24' }}
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>

        {/* Review Content */}
        <div style={{
          opacity: isTransitioning ? 0 : 1,
          transform: isTransitioning ? 'translateY(20px)' : 'translateY(0)',
          transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out'
        }}>
          <p style={{
            fontSize: '20px',
            lineHeight: '1.6',
            marginBottom: '32px',
            fontStyle: 'italic',
            color: '#374151'
          }}>
            "{currentReview.content}"
          </p>

          <div>
            <p style={{
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '4px',
              color: '#111827'
            }}>
              {currentReview.name}
            </p>
            <p style={{
              fontSize: '14px',
              color: '#6b7280'
            }}>
              {currentReview.role}
            </p>
          </div>
        </div>

        {/* Dots Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginTop: '48px'
        }}>
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: index === currentIndex ? '#0284c7' : 'rgba(2, 132, 199, 0.3)',
                cursor: 'pointer',
                transition: 'background-color 0.3s, transform 0.2s',
                padding: 0
              }}
              onMouseEnter={(e) => {
                if (index !== currentIndex) {
                  (e.target as HTMLElement).style.backgroundColor = 'rgba(2, 132, 199, 0.5)';
                }
                (e.target as HTMLElement).style.transform = 'scale(1.2)';
              }}
              onMouseLeave={(e) => {
                if (index !== currentIndex) {
                  (e.target as HTMLElement).style.backgroundColor = 'rgba(2, 132, 199, 0.3)';
                }
                (e.target as HTMLElement).style.transform = 'scale(1)';
              }}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
