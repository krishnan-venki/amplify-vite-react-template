
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import styles from './SagaaHomepage.module.css';
import { useEffect, useRef } from 'react';
import { StudentChatDemo } from './StudentChatDemo';

export const PersonalizedIntelligence_Section = () => {
    
      const fadeInElementsRef = useRef<HTMLDivElement[]>([]);
      useEffect(() => {
        // Fade in animation on scroll
        const observerOptions = {
          threshold: 0.1,
          rootMargin: '0px 0px -100px 0px'
        };
    
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add(styles.visible);
            }
          });
        }, observerOptions);
    
        // Observe all fade-in elements
        fadeInElementsRef.current.forEach(el => {
          if (el) observer.observe(el);
        });
    
        return () => observer.disconnect();
      }, []);
    
      const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !fadeInElementsRef.current.includes(el)) {
          fadeInElementsRef.current.push(el);
        }
      };
 
    return (
        <section id="growth" style={{
        padding: '60px 0',
        backgroundColor: '#f9fafb'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <div ref={addToRefs} className={styles.fadeInUp} style={{
            textAlign: 'center',
            marginBottom: '32px'
          }}>
            <h2 style={{
              fontSize: 'clamp(48px, 5vw, 80px)',
              fontWeight: '100',
              color: '#1d1d1f',
              marginBottom: '32px',
              lineHeight: '1.1'
            }}>              
               <span style={{ 
                    color: '#1d1d1f',
                    backgroundColor: 'transparent'
                }}>Personalized</span>{' '}
                <span style={{
                    background: 'linear-gradient(135deg, #007AFF 0%, #00D2FF 50%, #34C759 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    color: 'transparent'
                }}>Intelligence</span>
            </h2>
            <p style={{
              fontSize: '20px',
              color: '#6e6e73',
              maxWidth: '1280px',
              margin: '0 0 0 0',
              lineHeight: '1.6',
              textAlign: 'center'
            }}>
              Intelligence that truly knows you — personalized recommendations tailored to your preferences, and life events, powered by linked sources of truth and evolving insights as your life unfolds, to guide you to the next best step, on time.
            </p>
          </div>
        </div>
        
                
        {/* Swiper */}
        <div ref={addToRefs} className={styles.fadeInUp}>
              <Swiper
                spaceBetween={20}
                slidesPerView={1.15}
                centeredSlides={true}
                pagination={{ clickable: true }}
                cssMode={true}
                mousewheel={true}
                modules={[Pagination]}
                style={{ paddingBottom: '0px', marginBottom: '0px' }}
              >
                <SwiperSlide>
                  <div style={{
                    background: 'white',
                    borderRadius: '20px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)',
                    border: '1px solid rgba(255,255,255,0.8)',
                    padding: '12px',
                    width: '100%'
                   }}>
                    <StudentChatDemo />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
      </section>
    );
};

