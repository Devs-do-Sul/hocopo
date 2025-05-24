
import React, { useState, useEffect } from 'react';
import { Bell, BellOff, Star, Moon, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ZodiacSign {
  name: string;
  symbol: string;
  dateRange: string;
  element: string;
  horoscope: string;
}

const zodiacSigns: ZodiacSign[] = [
  {
    name: "Aries",
    symbol: "♈",
    dateRange: "March 21 - April 19",
    element: "Fire",
    horoscope: "Today brings a surge of creative energy that will illuminate new possibilities in your professional life. Your natural leadership qualities are particularly strong now, making this an excellent time to pitch new ideas or take charge of challenging projects. The planetary alignment suggests that a conversation with a colleague or mentor could open doors you hadn't previously considered. In matters of the heart, be bold but patient - someone special may be waiting for you to make the first move. Your ruling planet Mars is encouraging you to step outside your comfort zone, especially in financial decisions. Trust your instincts when it comes to investments or career changes. The evening hours favor personal reflection and planning for the week ahead. Remember that your pioneering spirit is your greatest asset, so don't let temporary setbacks discourage you from pursuing your goals with the determination that defines your sign."
  },
  {
    name: "Taurus",
    symbol: "♉",
    dateRange: "April 20 - May 20",
    element: "Earth",
    horoscope: "Venus, your ruling planet, is blessing you with heightened sensuality and appreciation for life's finer pleasures today. This is an ideal time to indulge in activities that nourish your soul - whether that's enjoying a gourmet meal, listening to beautiful music, or spending time in nature. Your practical nature is being rewarded as a long-term investment or savings plan shows promising results. In relationships, your steady and reliable nature is attracting positive attention from those who value depth and authenticity. However, be mindful not to let stubbornness prevent you from considering new perspectives, especially in family matters. The stars suggest that a change in your daily routine could lead to unexpected benefits for your health and well-being. Trust your natural instincts about people and situations - your ability to sense authenticity is particularly sharp right now. Financial opportunities may present themselves through social connections, so stay open to networking."
  },
  {
    name: "Gemini",
    symbol: "♊",
    dateRange: "May 21 - June 20",
    element: "Air",
    horoscope: "Your quick wit and natural curiosity are your superpowers today, dear Gemini. Mercury's influence is enhancing your communication skills, making this an excellent day for important conversations, presentations, or creative writing. You may find yourself juggling multiple interesting opportunities - trust your ability to adapt and multitask, but don't spread yourself too thin. A chance encounter or unexpected message could provide the missing piece to a puzzle you've been trying to solve. Your dual nature is an asset now, allowing you to see both sides of complex situations and find innovative solutions. In matters of love, your charm is irresistible, and intellectual connections are particularly favored. Consider exploring new learning opportunities or sharing your knowledge with others - teaching or mentoring could bring unexpected rewards. The afternoon brings favorable conditions for travel plans or connecting with people from different backgrounds. Stay flexible and keep your options open, as the best opportunities often come disguised as casual conversations."
  },
  {
    name: "Cancer",
    symbol: "♋",
    dateRange: "June 21 - July 22",
    element: "Water",
    horoscope: "The Moon's gentle influence is amplifying your intuitive powers today, making you exceptionally sensitive to the emotions and needs of those around you. This emotional intelligence is your greatest strength right now - use it to deepen connections with family and close friends. Your nurturing nature is being called upon, and you'll find great satisfaction in helping others feel secure and cared for. Home and family matters take center stage, and you may receive good news related to property or domestic arrangements. Your creative abilities are flowing freely, so consider channeling your emotions into artistic pursuits or home decorating projects. In professional settings, your ability to create a harmonious atmosphere will be noticed and appreciated by superiors. Trust your gut feelings about new people entering your life - your instincts about character are rarely wrong. The evening is perfect for intimate gatherings or quiet moments of reflection. Remember that caring for others starts with caring for yourself, so make time for the self-care rituals that restore your emotional balance."
  },
  {
    name: "Leo",
    symbol: "♌",
    dateRange: "July 23 - August 22",
    element: "Fire",
    horoscope: "The Sun is shining brightly on your endeavors today, illuminating your natural charisma and creative talents. This is your moment to step into the spotlight and share your unique gifts with the world. Your confidence is magnetic, drawing opportunities and admirers alike. A creative project or performance could gain unexpected recognition, so don't be modest about showcasing your abilities. In leadership roles, your generous spirit and ability to inspire others will create lasting positive impacts. Romance is highly favored, with the potential for grand gestures and passionate declarations. However, remember that true leadership involves lifting others up, not just basking in personal glory. Your ruling Sun encourages you to be authentic and generous in all your dealings. Children or younger people may play a significant role in today's events, bringing joy and fresh perspectives. The arts, entertainment, or any field requiring creativity and self-expression offers particular promise. Trust in your natural ability to brighten any room you enter, but balance your need for attention with genuine care for others' feelings."
  },
  {
    name: "Virgo",
    symbol: "♍",
    dateRange: "August 23 - September 22",
    element: "Earth",
    horoscope: "Your meticulous attention to detail and analytical mind are your greatest assets today, helping you solve problems that others might overlook. Mercury's influence is sharpening your already keen observational skills, making this an excellent time for research, planning, or organizing important projects. Your practical approach to challenges will impress colleagues and superiors, potentially leading to increased responsibilities or recognition. Health and wellness are highlighted - consider implementing new routines that support your physical and mental well-being. Your desire to be of service to others is strong now, and you'll find fulfillment in helping friends or colleagues navigate difficult situations. In relationships, your thoughtful gestures and reliability are deeply appreciated, even if you don't always receive immediate acknowledgment. Don't let perfectionism prevent you from enjoying life's simple pleasures. A systematic approach to a financial matter could yield better results than expected. The evening favors quiet activities that allow you to process the day's experiences and plan for tomorrow. Remember that your pursuit of excellence inspires others to raise their own standards."
  },
  {
    name: "Libra",
    symbol: "♎",
    dateRange: "September 23 - October 22",
    element: "Air",
    horoscope: "Venus is bestowing her gifts of harmony and beauty upon you today, enhancing your natural diplomatic skills and aesthetic sensibilities. Your ability to see all sides of a situation makes you an invaluable mediator in conflicts, and your fair-minded approach will be sought after by others. Partnerships of all kinds are favored, whether in business, romance, or friendship. Your charm and social grace open doors that might remain closed to others. Consider investing in beautiful objects or experiences that bring joy to your daily life - your appreciation for beauty is particularly heightened now. In matters of justice or fairness, you may find yourself in a position to make a meaningful difference. Your desire for balance extends to all areas of life, so pay attention to achieving equilibrium between work and personal time. Romantic opportunities are abundant, with potential for meaningful connections based on shared values and intellectual compatibility. Collaborative projects promise exceptional results, as your ability to bring out the best in others creates synergistic effects. Trust your instincts about design, aesthetics, and social dynamics."
  },
  {
    name: "Scorpio",
    symbol: "♏",
    dateRange: "October 23 - November 21",
    element: "Water",
    horoscope: "Pluto's transformative energy is working powerfully through you today, bringing opportunities for profound personal growth and regeneration. Your intuitive abilities are exceptionally strong, allowing you to perceive hidden truths and underlying motivations that others miss entirely. This psychological insight gives you a significant advantage in both personal and professional situations. A secret or mystery may be revealed that changes your perspective on an important matter. Your magnetic presence and intensity draw others to you, but be mindful of using this power responsibly. Research, investigation, or any work requiring depth and persistence is highly favored. In relationships, emotional intimacy and honest communication can heal old wounds and strengthen bonds. Your ability to transform challenges into opportunities is remarkable now - trust in your resilience and inner strength. Financial matters involving shared resources, investments, or other people's money show positive developments. The spiritual and metaphysical realms call to you, offering insights that could reshape your worldview. Remember that true power comes from self-mastery and the ability to help others transform their lives."
  },
  {
    name: "Sagittarius",
    symbol: "♐",
    dateRange: "November 22 - December 21",
    element: "Fire",
    horoscope: "Jupiter's expansive influence is opening up exciting new horizons for you today, igniting your natural wanderlust and thirst for knowledge. Your optimistic outlook and philosophical nature attract opportunities for growth through education, travel, or cultural exchange. A chance to expand your worldview through meeting people from different backgrounds could prove transformative. Your natural teaching abilities and enthusiasm for sharing knowledge make you an inspiring presence in any group. Adventure calls to you, whether through physical travel or intellectual exploration of new subjects. In matters of higher learning, publishing, or legal affairs, positive developments are likely. Your honesty and straightforward approach, while sometimes blunt, is refreshing to others and builds trust. International connections or long-distance communications bring good news. Your sense of humor and ability to see the bigger picture help others gain perspective on their problems. Consider embarking on a spiritual or philosophical journey that could reshape your understanding of life's purpose. The afternoon brings opportunities for outdoor activities or sports that feed your need for freedom and movement."
  },
  {
    name: "Capricorn",
    symbol: "♑",
    dateRange: "December 22 - January 19",
    element: "Earth",
    horoscope: "Saturn's steady influence is rewarding your patience and persistent efforts with tangible progress toward your long-term goals. Your reputation for reliability and competence continues to grow, positioning you for leadership opportunities or increased recognition in your field. A methodical approach to a challenging project yields better results than expected, proving once again that slow and steady wins the race. Your practical wisdom and mature perspective are valued by both younger and older colleagues. Career advancement or financial improvement may come through traditional channels rather than risky ventures. Your ability to plan for the future and make sacrifices for long-term gain sets you apart from more impulsive personalities. In relationships, your loyalty and dependability create a sense of security that others cherish. Consider making concrete plans for goals you've been contemplating - the time for action is now. Your natural leadership qualities may be called upon to guide a team or organization through challenging times. Remember that your greatest strength lies in your ability to build lasting foundations for success. Authority figures may take notice of your contributions today."
  },
  {
    name: "Aquarius",
    symbol: "♒",
    dateRange: "January 20 - February 18",
    element: "Air",
    horoscope: "Uranus is electrifying your innovative spirit today, bringing flashes of genius and unconventional solutions to old problems. Your humanitarian instincts are strong, and you may find yourself drawn to causes that benefit society as a whole. Technology and progressive ideas feature prominently in today's activities - embrace new tools or methods that can improve efficiency or communication. Your unique perspective and willingness to challenge conventional thinking make you a catalyst for positive change. Friendships and group activities are highlighted, with the potential for forming connections with like-minded individuals who share your vision for a better future. Your detached yet caring approach to problems allows you to see solutions that more emotionally involved parties might miss. Sudden insights or unexpected developments could completely alter your approach to a long-standing issue. In matters of social justice or community improvement, your voice carries special weight today. Don't be afraid to express ideas that others might consider radical - your forward-thinking nature often proves to be ahead of its time. Collaboration with diverse groups brings innovative results."
  },
  {
    name: "Pisces",
    symbol: "♓",
    dateRange: "February 19 - March 20",
    element: "Water",
    horoscope: "Neptune's mystical influence is heightening your already powerful intuition and creative imagination today. Your empathetic nature allows you to understand and comfort others in ways that feel almost magical to them. Artistic pursuits and spiritual practices are especially favored, offering pathways to both personal fulfillment and potential recognition. Your ability to tap into the collective unconscious gives you insights into trends and movements before they become obvious to others. Dreams and synchronicities provide meaningful guidance - pay attention to recurring symbols or themes. Your compassionate response to someone's difficulties creates a ripple effect of healing that extends far beyond the immediate situation. Water-related activities or locations bring peace and inspiration to your soul. Your natural psychic abilities are particularly strong now, so trust those gut feelings about people and situations. In relationships, your understanding and forgiveness create deeper intimacy and emotional healing. Consider channeling your abundant emotions into creative expression or charitable work. The boundary between the material and spiritual worlds seems especially thin today, offering opportunities for profound insights and mystical experiences."
  }
];

const Index = () => {
  const [selectedSign, setSelectedSign] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<{[key: string]: boolean}>({});
  const { toast } = useToast();

  useEffect(() => {
    // Load notification preferences from localStorage
    const saved = localStorage.getItem('horoscopeNotifications');
    if (saved) {
      setNotifications(JSON.parse(saved));
    }
  }, []);

  const toggleNotification = (signName: string) => {
    const newNotifications = {
      ...notifications,
      [signName]: !notifications[signName]
    };
    setNotifications(newNotifications);
    localStorage.setItem('horoscopeNotifications', JSON.stringify(newNotifications));
    
    toast({
      title: notifications[signName] ? "Notifications disabled" : "Notifications enabled",
      description: `Daily horoscopes for ${signName} ${notifications[signName] ? 'disabled' : 'enabled'}`,
    });
  };

  const selectedZodiac = zodiacSigns.find(sign => sign.name === selectedSign);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 animate-pulse">
          <Star className="w-4 h-4 text-yellow-300 opacity-70" />
        </div>
        <div className="absolute top-32 right-20 animate-pulse delay-1000">
          <Star className="w-3 h-3 text-yellow-200 opacity-60" />
        </div>
        <div className="absolute bottom-40 left-1/4 animate-pulse delay-2000">
          <Moon className="w-6 h-6 text-blue-200 opacity-50" />
        </div>
        <div className="absolute top-1/3 right-1/3 animate-pulse delay-3000">
          <Star className="w-2 h-2 text-white opacity-80" />
        </div>
        <div className="absolute bottom-20 right-10 animate-pulse delay-500">
          <Sun className="w-5 h-5 text-yellow-400 opacity-60" />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300 mb-4">
            Daily Horoscope
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Discover what the stars have in store for you today. Select your zodiac sign and enable notifications for daily cosmic guidance.
          </p>
        </div>

        {!selectedSign ? (
          /* Zodiac Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {zodiacSigns.map((sign) => (
              <Card 
                key={sign.name}
                className="group bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl"
                onClick={() => setSelectedSign(sign.name)}
              >
                <CardHeader className="text-center pb-2">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {sign.symbol}
                  </div>
                  <CardTitle className="text-white text-xl font-bold">
                    {sign.name}
                  </CardTitle>
                  <p className="text-blue-200 text-sm">{sign.dateRange}</p>
                  <p className="text-yellow-300 text-xs font-semibold">{sign.element}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm">Daily notifications</span>
                    <div className="flex items-center space-x-2">
                      {notifications[sign.name] ? (
                        <Bell className="w-4 h-4 text-yellow-400" />
                      ) : (
                        <BellOff className="w-4 h-4 text-gray-400" />
                      )}
                      <Switch
                        checked={notifications[sign.name] || false}
                        onCheckedChange={(checked) => {
                          toggleNotification(sign.name);
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Selected Sign Detail */
          <div className="max-w-4xl mx-auto">
            <Button 
              onClick={() => setSelectedSign(null)}
              variant="outline"
              className="mb-6 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              ← Back to all signs
            </Button>
            
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader className="text-center">
                <div className="text-8xl mb-4">
                  {selectedZodiac?.symbol}
                </div>
                <CardTitle className="text-white text-4xl font-bold mb-2">
                  {selectedZodiac?.name}
                </CardTitle>
                <p className="text-blue-200 text-lg">{selectedZodiac?.dateRange}</p>
                <p className="text-yellow-300 font-semibold">{selectedZodiac?.element} Sign</p>
              </CardHeader>
              <CardContent>
                <div className="bg-white/5 rounded-lg p-6 mb-6">
                  <h3 className="text-white text-xl font-semibold mb-4 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-400" />
                    Today's Horoscope
                  </h3>
                  <p className="text-blue-100 leading-relaxed text-lg">
                    {selectedZodiac?.horoscope}
                  </p>
                </div>
                
                <div className="flex items-center justify-between bg-white/5 rounded-lg p-4">
                  <span className="text-white text-lg">Enable daily notifications for {selectedZodiac?.name}</span>
                  <div className="flex items-center space-x-3">
                    {notifications[selectedZodiac?.name || ''] ? (
                      <Bell className="w-5 h-5 text-yellow-400" />
                    ) : (
                      <BellOff className="w-5 h-5 text-gray-400" />
                    )}
                    <Switch
                      checked={notifications[selectedZodiac?.name || ''] || false}
                      onCheckedChange={() => toggleNotification(selectedZodiac?.name || '')}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
