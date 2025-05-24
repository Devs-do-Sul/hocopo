
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
  backgroundStyle: string;
}

const zodiacSigns: ZodiacSign[] = [
  {
    name: "Áries",
    symbol: "♈",
    dateRange: "21 de Março - 19 de Abril",
    element: "Fogo",
    backgroundStyle: "bg-gradient-to-br from-red-600 via-orange-500 to-yellow-400",
    horoscope: "Hoje traz uma onda de energia criativa que iluminará novas possibilidades em sua vida profissional. Suas qualidades naturais de liderança estão particularmente fortes agora, tornando este um momento excelente para apresentar novas ideias ou assumir projetos desafiadores. O alinhamento planetário sugere que uma conversa com um colega ou mentor pode abrir portas que você não havia considerado anteriormente. Em questões do coração, seja corajoso mas paciente - alguém especial pode estar esperando você dar o primeiro passo. Seu planeta regente Marte está encorajando você a sair da sua zona de conforto, especialmente em decisões financeiras. Confie em seus instintos quando se trata de investimentos ou mudanças de carreira. As horas da noite favorecem reflexão pessoal e planejamento para a semana que vem. Lembre-se de que seu espírito pioneiro é seu maior patrimônio."
  },
  {
    name: "Touro",
    symbol: "♉",
    dateRange: "20 de Abril - 20 de Maio",
    element: "Terra",
    backgroundStyle: "bg-gradient-to-br from-green-700 via-emerald-500 to-lime-400",
    horoscope: "Vênus, seu planeta regente, está abençoando você com sensualidade elevada e apreciação pelos prazeres mais refinados da vida hoje. Este é um momento ideal para se entregar a atividades que nutrem sua alma - seja desfrutando de uma refeição gourmet, ouvindo música bela ou passando tempo na natureza. Sua natureza prática está sendo recompensada quando um investimento de longo prazo ou plano de poupança mostra resultados promissores. Nos relacionamentos, sua natureza estável e confiável está atraindo atenção positiva daqueles que valorizam profundidade e autenticidade. No entanto, tenha cuidado para não deixar a teimosia impedir você de considerar novas perspectivas, especialmente em assuntos familiares. As estrelas sugerem que uma mudança em sua rotina diária pode levar a benefícios inesperados para sua saúde e bem-estar. Confie em seus instintos naturais sobre pessoas e situações."
  },
  {
    name: "Gêmeos",
    symbol: "♊",
    dateRange: "21 de Maio - 20 de Junho",
    element: "Ar",
    backgroundStyle: "bg-gradient-to-br from-sky-400 via-cyan-300 to-blue-200",
    horoscope: "Sua perspicácia e curiosidade natural são seus superpoderes hoje, caro Gêmeos. A influência de Mercúrio está aprimorando suas habilidades de comunicação, tornando este um dia excelente para conversas importantes, apresentações ou escrita criativa. Você pode se encontrar equilibrando múltiplas oportunidades interessantes - confie em sua capacidade de se adaptar e realizar várias tarefas, mas não se espalhe demais. Um encontro casual ou mensagem inesperada pode fornecer a peça que faltava para um quebra-cabeça que você tem tentado resolver. Sua natureza dual é um trunfo agora, permitindo que você veja ambos os lados de situações complexas e encontre soluções inovadoras. Em questões de amor, seu charme é irresistível, e conexões intelectuais são particularmente favorecidas. Considere explorar novas oportunidades de aprendizado ou compartilhar seu conhecimento com outros."
  },
  {
    name: "Câncer",
    symbol: "♋",
    dateRange: "21 de Junho - 22 de Julho",
    element: "Água",
    backgroundStyle: "bg-gradient-to-br from-blue-800 via-indigo-600 to-purple-400",
    horoscope: "A influência suave da Lua está amplificando seus poderes intuitivos hoje, tornando você excepcionalmente sensível às emoções e necessidades daqueles ao seu redor. Esta inteligência emocional é sua maior força agora - use-a para aprofundar conexões com família e amigos próximos. Sua natureza carinhosa está sendo solicitada, e você encontrará grande satisfação em ajudar outros a se sentirem seguros e cuidados. Assuntos domésticos e familiares ocupam o centro do palco, e você pode receber boas notícias relacionadas a propriedade ou arranjos domésticos. Suas habilidades criativas estão fluindo livremente, então considere canalizar suas emoções para empreendimentos artísticos ou projetos de decoração. Em ambientes profissionais, sua capacidade de criar uma atmosfera harmoniosa será notada e apreciada pelos superiores. Confie em seus sentimentos instintivos sobre novas pessoas entrando em sua vida."
  },
  {
    name: "Leão",
    symbol: "♌",
    dateRange: "23 de Julho - 22 de Agosto",
    element: "Fogo",
    backgroundStyle: "bg-gradient-to-br from-yellow-500 via-orange-400 to-red-500",
    horoscope: "O Sol está brilhando intensamente em seus empreendimentos hoje, iluminando seu carisma natural e talentos criativos. Este é seu momento de entrar nos holofotes e compartilhar seus dons únicos com o mundo. Sua confiança é magnética, atraindo tanto oportunidades quanto admiradores. Um projeto criativo ou performance pode ganhar reconhecimento inesperado, então não seja modesto sobre mostrar suas habilidades. Em papéis de liderança, seu espírito generoso e capacidade de inspirar outros criará impactos positivos duradouros. O romance é altamente favorecido, com potencial para grandes gestos e declarações apaixonadas. No entanto, lembre-se de que a verdadeira liderança envolve elevar os outros, não apenas basear-se na glória pessoal. Seu Sol regente encoraja você a ser autêntico e generoso em todos os seus relacionamentos. Crianças ou pessoas mais jovens podem desempenhar um papel significativo nos eventos de hoje."
  },
  {
    name: "Virgem",
    symbol: "♍",
    dateRange: "23 de Agosto - 22 de Setembro",
    element: "Terra",
    backgroundStyle: "bg-gradient-to-br from-green-600 via-teal-500 to-cyan-400",
    horoscope: "Sua atenção meticulosa aos detalhes e mente analítica são seus maiores trunfos hoje, ajudando você a resolver problemas que outros podem ignorar. A influência de Mercúrio está aguçando suas já afiadas habilidades de observação, tornando este um momento excelente para pesquisa, planejamento ou organização de projetos importantes. Sua abordagem prática aos desafios impressionará colegas e superiores, potencialmente levando a responsabilidades aumentadas ou reconhecimento. Saúde e bem-estar estão em destaque - considere implementar novas rotinas que apoiem seu bem-estar físico e mental. Seu desejo de ser útil aos outros é forte agora, e você encontrará realização em ajudar amigos ou colegas a navegar situações difíceis. Nos relacionamentos, seus gestos atenciosos e confiabilidade são profundamente apreciados. Não deixe o perfeccionismo impedir você de desfrutar dos prazeres simples da vida."
  },
  {
    name: "Libra",
    symbol: "♎",
    dateRange: "23 de Setembro - 22 de Outubro",
    element: "Ar",
    backgroundStyle: "bg-gradient-to-br from-pink-400 via-rose-300 to-purple-300",
    horoscope: "Vênus está concedendo seus dons de harmonia e beleza a você hoje, aprimorando suas habilidades diplomáticas naturais e sensibilidades estéticas. Sua capacidade de ver todos os lados de uma situação faz de você um mediador inestimável em conflitos, e sua abordagem justa será procurada por outros. Parcerias de todos os tipos são favorecidas, seja nos negócios, romance ou amizade. Seu charme e graça social abrem portas que podem permanecer fechadas para outros. Considere investir em objetos belos ou experiências que tragam alegria à sua vida diária - sua apreciação pela beleza está particularmente elevada agora. Em questões de justiça ou equidade, você pode se encontrar em posição de fazer uma diferença significativa. Seu desejo de equilíbrio se estende a todas as áreas da vida, então preste atenção em alcançar equilíbrio entre trabalho e tempo pessoal. Oportunidades românticas são abundantes."
  },
  {
    name: "Escorpião",
    symbol: "♏",
    dateRange: "23 de Outubro - 21 de Novembro",
    element: "Água",
    backgroundStyle: "bg-gradient-to-br from-purple-900 via-red-800 to-black",
    horoscope: "A energia transformadora de Plutão está trabalhando poderosamente através de você hoje, trazendo oportunidades para crescimento pessoal profundo e regeneração. Suas habilidades intuitivas estão excepcionalmente fortes, permitindo que você perceba verdades ocultas e motivações subjacentes que outros perdem completamente. Este insight psicológico lhe dá uma vantagem significativa tanto em situações pessoais quanto profissionais. Um segredo ou mistério pode ser revelado que muda sua perspectiva sobre um assunto importante. Sua presença magnética e intensidade atraem outros a você, mas seja consciente de usar esse poder responsavelmente. Pesquisa, investigação ou qualquer trabalho que requeira profundidade e persistência é altamente favorecido. Nos relacionamentos, intimidade emocional e comunicação honesta podem curar feridas antigas e fortalecer vínculos. Sua capacidade de transformar desafios em oportunidades é notável agora."
  },
  {
    name: "Sagitário",
    symbol: "♐",
    dateRange: "22 de Novembro - 21 de Dezembro",
    element: "Fogo",
    backgroundStyle: "bg-gradient-to-br from-orange-600 via-yellow-500 to-red-400",
    horoscope: "A influência expansiva de Júpiter está abrindo novos horizontes emocionantes para você hoje, acendendo sua paixão natural por viagens e sede de conhecimento. Sua perspectiva otimista e natureza filosófica atraem oportunidades de crescimento através de educação, viagem ou intercâmbio cultural. Uma chance de expandir sua visão de mundo através do encontro com pessoas de diferentes origens pode ser transformadora. Suas habilidades naturais de ensino e entusiasmo para compartilhar conhecimento fazem de você uma presença inspiradora em qualquer grupo. A aventura está chamando você, seja através de viagem física ou exploração intelectual de novos assuntos. Em questões de ensino superior, publicação ou assuntos legais, desenvolvimentos positivos são prováveis. Sua honestidade e abordagem direta, embora às vezes franca, é refrescante para outros e constrói confiança. Conexões internacionais ou comunicações de longa distância trazem boas notícias."
  },
  {
    name: "Capricórnio",
    symbol: "♑",
    dateRange: "22 de Dezembro - 19 de Janeiro",
    element: "Terra",
    backgroundStyle: "bg-gradient-to-br from-gray-700 via-slate-600 to-stone-500",
    horoscope: "A influência constante de Saturno está recompensando sua paciência e esforços persistentes com progresso tangível em direção aos seus objetivos de longo prazo. Sua reputação de confiabilidade e competência continua a crescer, posicionando você para oportunidades de liderança ou reconhecimento aumentado em seu campo. Uma abordagem metódica para um projeto desafiador rende resultados melhores do que o esperado, provando mais uma vez que devagar e sempre ganha a corrida. Sua sabedoria prática e perspectiva madura são valorizadas tanto por colegas mais jovens quanto mais velhos. Avanço na carreira ou melhoria financeira pode vir através de canais tradicionais em vez de empreendimentos arriscados. Sua capacidade de planejar para o futuro e fazer sacrifícios para ganho de longo prazo o distingue de personalidades mais impulsivas. Nos relacionamentos, sua lealdade e confiabilidade criam uma sensação de segurança que outros prezam."
  },
  {
    name: "Aquário",
    symbol: "♒",
    dateRange: "20 de Janeiro - 18 de Fevereiro",
    element: "Ar",
    backgroundStyle: "bg-gradient-to-br from-cyan-500 via-blue-400 to-indigo-500",
    horoscope: "Urano está eletrificando seu espírito inovador hoje, trazendo lampejos de genialidade e soluções não convencionais para problemas antigos. Seus instintos humanitários são fortes, e você pode se encontrar atraído por causas que beneficiam a sociedade como um todo. Tecnologia e ideias progressivas figuram proeminentemente nas atividades de hoje - abrace novas ferramentas ou métodos que podem melhorar a eficiência ou comunicação. Sua perspectiva única e disposição para desafiar o pensamento convencional fazem de você um catalisador para mudança positiva. Amizades e atividades em grupo estão em destaque, com potencial para formar conexões com indivíduos de mentalidade similar que compartilham sua visão para um futuro melhor. Sua abordagem desapegada mas carinhosa aos problemas permite que você veja soluções que partes mais emocionalmente envolvidas podem perder. Insights súbitos ou desenvolvimentos inesperados podem alterar completamente sua abordagem para uma questão de longa data."
  },
  {
    name: "Peixes",
    symbol: "♓",
    dateRange: "19 de Fevereiro - 20 de Março",
    element: "Água",
    backgroundStyle: "bg-gradient-to-br from-teal-600 via-blue-500 to-purple-600",
    horoscope: "A influência mística de Netuno está elevando sua já poderosa intuição e imaginação criativa hoje. Sua natureza empática permite que você compreenda e console outros de maneiras que parecem quase mágicas para eles. Empreendimentos artísticos e práticas espirituais são especialmente favorecidos, oferecendo caminhos tanto para realização pessoal quanto reconhecimento potencial. Sua capacidade de acessar o inconsciente coletivo lhe dá insights sobre tendências e movimentos antes que se tornem óbvios para outros. Sonhos e sincronicidades fornecem orientação significativa - preste atenção a símbolos ou temas recorrentes. Sua resposta compassiva às dificuldades de alguém cria um efeito cascata de cura que se estende muito além da situação imediata. Atividades ou locais relacionados à água trazem paz e inspiração à sua alma. Suas habilidades psíquicas naturais estão particularmente fortes agora, então confie nessas sensações instintivas sobre pessoas e situações."
  }
];

const Index = () => {
  const [selectedSign, setSelectedSign] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<{[key: string]: boolean}>({});
  const { toast } = useToast();

  useEffect(() => {
    // Carregar preferências de notificação do localStorage
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
      title: notifications[signName] ? "Notificações desabilitadas" : "Notificações habilitadas",
      description: `Horóscopo diário para ${signName} ${notifications[signName] ? 'desabilitado' : 'habilitado'}`,
    });
  };

  const selectedZodiac = zodiacSigns.find(sign => sign.name === selectedSign);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-black relative overflow-hidden">
      {/* Elementos de fundo animados estilo Via Láctea */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Estrelas pequenas */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className={`absolute animate-pulse`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            <Star className="w-1 h-1 text-white opacity-60" />
          </div>
        ))}
        
        {/* Estrelas médias */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`medium-${i}`}
            className={`absolute animate-pulse`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <Star className="w-2 h-2 text-yellow-300 opacity-70" />
          </div>
        ))}

        {/* Elementos celestiais especiais */}
        <div className="absolute top-20 left-10 animate-pulse">
          <Moon className="w-8 h-8 text-blue-200 opacity-40" />
        </div>
        <div className="absolute bottom-20 right-10 animate-pulse delay-1000">
          <Sun className="w-6 h-6 text-yellow-400 opacity-50" />
        </div>
        
        {/* Nuvem de estrelas da Via Láctea */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-900/20 to-transparent transform rotate-12 opacity-30"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 mb-4">
            Horóscopo Diário
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Descubra o que as estrelas reservaram para você hoje. Selecione seu signo e ative as notificações para receber orientação cósmica diariamente.
          </p>
          <p className="text-sm text-purple-300 mt-4 opacity-80">
            * Conteúdo baseado em fontes astrológicas brasileiras e traduzido automaticamente quando necessário
          </p>
        </div>

        {!selectedSign ? (
          /* Grade dos Signos */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {zodiacSigns.map((sign) => (
              <Card 
                key={sign.name}
                className="group bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl overflow-hidden"
                onClick={() => setSelectedSign(sign.name)}
              >
                <div className={`absolute inset-0 opacity-20 ${sign.backgroundStyle}`}></div>
                <CardHeader className="text-center pb-2 relative z-10">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {sign.symbol}
                  </div>
                  <CardTitle className="text-white text-xl font-bold">
                    {sign.name}
                  </CardTitle>
                  <p className="text-blue-200 text-sm">{sign.dateRange}</p>
                  <p className="text-yellow-300 text-xs font-semibold">Elemento {sign.element}</p>
                </CardHeader>
                <CardContent className="pt-0 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm">Notificações diárias</span>
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
          /* Detalhes do Signo Selecionado */
          <div className="max-w-4xl mx-auto">
            <Button 
              onClick={() => setSelectedSign(null)}
              variant="outline"
              className="mb-6 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              ← Voltar para todos os signos
            </Button>
            
            <Card className="bg-white/10 backdrop-blur-md border-white/20 overflow-hidden">
              <div className={`absolute inset-0 opacity-30 ${selectedZodiac?.backgroundStyle}`}></div>
              <CardHeader className="text-center relative z-10">
                <div className="text-8xl mb-4">
                  {selectedZodiac?.symbol}
                </div>
                <CardTitle className="text-white text-4xl font-bold mb-2">
                  {selectedZodiac?.name}
                </CardTitle>
                <p className="text-blue-200 text-lg">{selectedZodiac?.dateRange}</p>
                <p className="text-yellow-300 font-semibold">Signo de {selectedZodiac?.element}</p>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="bg-black/20 rounded-lg p-6 mb-6 backdrop-blur-sm">
                  <h3 className="text-white text-xl font-semibold mb-4 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-400" />
                    Horóscopo de Hoje
                  </h3>
                  <p className="text-blue-100 leading-relaxed text-lg">
                    {selectedZodiac?.horoscope}
                  </p>
                </div>
                
                <div className="flex items-center justify-between bg-black/20 rounded-lg p-4 backdrop-blur-sm">
                  <span className="text-white text-lg">Ativar notificações diárias para {selectedZodiac?.name}</span>
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
