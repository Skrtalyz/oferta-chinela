import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlipperStyle, GameState, Step } from '../types.ts';
import { 
  Sparkles, 
  Trophy, 
  Target, 
  Heart, 
  Gift, 
  Zap, 
  Lock, 
  Star, 
  ArrowRight,
  ShoppingCart,
  Timer, 
  CheckCircle,
  HelpCircle,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Smartphone,
  ZapIcon,
  DownloadCloud
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface StepProps {
  onNext: () => void;
  state?: GameState;
  updateState?: (updates: Partial<GameState>) => void;
}

const CartoonButton: React.FC<{ onClick: () => void, children: React.ReactNode, className?: string, disabled?: boolean }> = ({ onClick, children, className = "", disabled }) => (
  <button
    disabled={disabled}
    onClick={(e) => {
      if (e && e.preventDefault) e.preventDefault();
      if (e && e.stopPropagation) e.stopPropagation();
      onClick();
    }}
    className={`bg-rose-500 text-white font-black py-5 px-8 rounded-[2rem] border-b-8 border-rose-700 hover:bg-rose-400 active:border-b-0 active:translate-y-2 transition-all flex items-center justify-center gap-3 text-xl cartoon-btn-shadow ${className}`}
  >
    {children}
  </button>
);

const CartoonCard: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-white rounded-[2.5rem] border-4 border-yellow-200 p-6 cartoon-shadow ${className}`}>
    {children}
  </div>
);

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-rose-100 last:border-0">
      <button 
        onClick={(e) => {
          if (e && e.preventDefault) e.preventDefault();
          if (e && e.stopPropagation) e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="w-full py-4 flex items-center justify-between text-left gap-3 focus:outline-none"
      >
        <span className="font-bold text-gray-700 text-sm leading-tight">{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-rose-400" /> : <ChevronDown className="w-5 h-5 text-rose-400" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-xs font-medium text-gray-500 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const EntryStep: React.FC<StepProps> = ({ onNext }) => (
  <div className="text-center py-10 space-y-8 h-full flex flex-col justify-center items-center">
    <div className="inline-block mx-auto mb-4">
      <img 
        src="https://i.postimg.cc/qRwmdxD7/Design-sem-nome-(15).png" 
        alt="Logo Sorte Chinelista" 
        className="w-48 h-auto drop-shadow-lg"
      />
    </div>
    <h1 className="text-4xl font-black text-rose-600 leading-tight drop-shadow-md">
      Sorte Chinelista 100 Artes 👟✨
    </h1>
    <p className="text-gray-800 text-lg font-bold leading-relaxed px-4">
      Mulher poderosa! Quer transformar seu tempo livre em <span className="text-rose-500 underline">R$500 a R$3000 extras</span> por mês vendendo chinelos lindos e personalizados… do zero? 😍👟
    </p>
    <p className="text-gray-600 font-semibold text-sm">
      Jogue agora a <strong>Sorte Chinelista</strong> e gire roletas, abra baús, risque cartelas e desbloqueie descontos ÉPICOS + bônus exclusivos só pra você!
    </p>
    <CartoonButton onClick={() => onNext()} className="w-full">
      Entrar no Jogo e Girar! 🔥
    </CartoonButton>
    <p className="text-amber-600 text-sm font-bold italic animate-pulse">Clique e comece sua vitória hoje! 🎁</p>
  </div>
);

export const WelcomeStep: React.FC<StepProps & { state: GameState, updateState: any }> = ({ onNext, updateState }) => {
  const [name, setName] = useState('');
  return (
    <div className="space-y-8 pt-10">
      <CartoonCard>
        <h2 className="text-2xl font-black text-rose-600 mb-4 flex items-center gap-2">
          Bem-vinda, Guerreira! 💖
        </h2>
        <p className="text-gray-700 font-bold mb-4">
          Oi poderosa! Digite seu nome para personalizarmos sua jornada:
        </p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome lindo..."
          className="w-full p-5 rounded-3xl border-4 border-yellow-100 bg-yellow-50 focus:border-rose-400 outline-none text-rose-600 font-black text-xl mb-4 placeholder:text-yellow-200"
        />
        <div className="bg-rose-50 p-4 rounded-3xl border-2 border-rose-100 text-gray-700 font-semibold text-sm">
          Sem máquina cara, sem experiência? Relaxa… tudo começa simples, só com seu celular! Pronta pra girar sua primeira roda da sorte e desbloquear mais? 🍀
        </div>
      </CartoonCard>
      <CartoonButton
        onClick={() => {
          updateState({ userName: name || 'Guerreira' });
          onNext();
        }}
        className="w-full"
      >
        Girar a Roleta da Renda! <ArrowRight />
      </CartoonButton>
    </div>
  );
};

export const IncomeRouletteStep: React.FC<StepProps & { state: GameState, updateState: any }> = ({ state, updateState, onNext }) => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const options = [
    { value: '500', reason: 'Pagar uma conta pendente ou mimar os filhos com carinho extra' },
    { value: '1000', reason: 'Reformar um cantinho da casa ou investir em você mesma' },
    { value: '3000', reason: 'Viver disso, ser dona do seu horário e da sua liberdade!' }
  ];

  const spin = () => {
    setSpinning(true);
    setTimeout(() => {
      const win = options[Math.floor(Math.random() * options.length)];
      setResult(win.value);
      updateState({ 
        chosenIncome: win.value, 
        chosenIncomeReason: win.reason,
        points: (state?.points || 0) + 10,
        badges: [...(state?.badges || []), 'Sonhadora Financeira']
      });
      setSpinning(false);
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.7 }, colors: ['#fbbf24', '#f43f5e', '#ffffff'] });
    }, 2500);
  };

  return (
    <div className="text-center py-6 space-y-8">
      <h2 className="text-3xl font-black text-rose-600 drop-shadow-sm">Roleta da Renda dos Sonhos! 🌀</h2>
      
      <div className="relative w-72 h-72 mx-auto">
        <div className={`relative w-full h-full rounded-full border-[12px] border-amber-400 flex items-center justify-center bg-white cartoon-shadow overflow-hidden transition-transform duration-[2500ms] cubic-bezier(0.15, 0, 0.15, 1) ${spinning ? 'rotate-[1800deg]' : ''}`}>
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full rotate-0 absolute bg-yellow-400" style={{ clipPath: 'polygon(50% 50%, 0 0, 100% 0)' }}></div>
              <div className="w-full h-full rotate-[120deg] absolute bg-rose-400" style={{ clipPath: 'polygon(50% 50%, 0 0, 100% 0)' }}></div>
              <div className="w-full h-full rotate-[240deg] absolute bg-amber-400" style={{ clipPath: 'polygon(50% 50%, 0 0, 100% 0)' }}></div>
           </div>
           <div className="z-10 bg-white p-4 rounded-full border-4 border-amber-200">
             <Zap className="w-10 h-10 text-yellow-500 fill-current" />
           </div>
        </div>
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-12 bg-rose-600 z-20" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}></div>
      </div>

      {!result && (
        <CartoonButton
          disabled={spinning}
          onClick={() => spin()}
          className="w-full"
        >
          {spinning ? 'Girando a Sorte...' : 'Girar Agora! 🌀'}
        </CartoonButton>
      )}

      {result && (
        <motion.div initial={{ scale: 0.8, y: 20 }} animate={{ scale: 1, y: 0 }} className="space-y-6">
          <CartoonCard className="bg-green-50 border-green-200">
            <p className="text-2xl font-black text-green-700">
              Pareceu em... <strong>R${result}! ❤️</strong>
            </p>
            <p className="text-gray-700 font-bold mt-2">
              Uau {state?.userName}! R${result} para {state?.chosenIncomeReason} é perfeito pra você.
            </p>
          </CartoonCard>
          <div className="bg-amber-100 p-4 rounded-3xl border-2 border-amber-300">
            <p className="text-amber-700 font-black">Nível 1 concluído – +10 pontos de sorte! 🏆</p>
          </div>
          <CartoonButton onClick={() => onNext()} className="w-full">
            Próximo nível: escolha seu estilo!
          </CartoonButton>
        </motion.div>
      )}
    </div>
  );
};

export const StyleSelectionStep: React.FC<StepProps & { state: GameState, updateState: any }> = ({ state, updateState, onNext }) => {
  const styles: { id: SlipperStyle; title: string; desc: string; img: string }[] = [
    { id: 'religioso', title: 'Religiosos 🙏', desc: 'Frases de fé, cruz, anjo', img: 'https://i.postimg.cc/C50c36sv/907e5a507038ccd323f22cae49da237e.jpg' },
    { id: 'flores', title: 'Flores e Mandalas 🌸', desc: 'Delicadas, perfeitas pro dia a dia', img: 'https://i.postimg.cc/8P1yw95r/7ac215aa1175edcd38b193385a9ba87f.jpg' },
    { id: 'frases', title: 'Frases e Logos 💥', desc: 'Girl Power, motivacionais', img: 'https://i.postimg.cc/mkVy0ZDL/3dac34d2767e49cf206af11b01a30e00.jpg' },
    { id: 'festas', title: 'Temas Festivos 🎉', desc: 'Juninos, namorados, outros', img: 'https://i.postimg.cc/J0TjpTTS/dce3a9efb8210a608b352efcd17ab9f8.jpg' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-black text-rose-600 text-center leading-tight">Nível 2: Qual estilo mais mexe com seu coração? 💖</h2>
      <div className="grid grid-cols-1 gap-4">
        {styles.map((s) => (
          <motion.button
            key={s.id}
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              if (e && e.preventDefault) e.preventDefault();
              if (e && e.stopPropagation) e.stopPropagation();
              
              updateState({ 
                chosenStyle: s.id,
                points: (state?.points || 0) + 5,
                badges: [...(state?.badges || []), 'Estilista Personalizada']
              });
              onNext();
            }}
            className="flex items-center gap-5 p-4 rounded-[2rem] border-4 border-yellow-200 bg-white cartoon-shadow text-left group transition-all"
          >
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-yellow-100 flex-shrink-0 pointer-events-none">
              <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
            </div>
            <div className="pointer-events-none">
              <p className="font-black text-xl text-rose-600 leading-tight">{s.title}</p>
              <p className="text-sm font-bold text-gray-500">{s.desc}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export const TreasureChestStep: React.FC<StepProps & { state: GameState, updateState: any }> = ({ state, updateState, onNext }) => {
  const [opened, setOpened] = useState(false);
  
  return (
    <div className="text-center py-6 space-y-8">
      <h2 className="text-3xl font-black text-rose-600">Baú de Tesouros! 🗝️</h2>
      <p className="text-gray-700 font-bold">Abra um baú mágico no seu tema {state?.chosenStyle}!</p>
      
      {!opened ? (
        <div className="grid grid-cols-3 gap-4 mt-8">
          {[1, 2, 3].map((num) => (
            <motion.button
              key={num}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                if (e && e.preventDefault) e.preventDefault();
                if (e && e.stopPropagation) e.stopPropagation();
                setOpened(true);
                updateState({ 
                  points: (state?.points || 0) + 10, 
                  badges: [...(state?.badges || []), 'Tesoureira da Sorte'] 
                });
                confetti({ particleCount: 50, colors: ['#fbbf24', '#fff'] });
              }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-amber-300 to-amber-500 rounded-[2rem] flex items-center justify-center border-4 border-white shadow-xl cartoon-shadow pointer-events-none">
                 <Lock className="w-10 h-10 text-white animate-float" />
              </div>
              <span className="text-sm font-black text-amber-600 uppercase pointer-events-none">Baú {num}</span>
            </motion.button>
          ))}
        </div>
      ) : (
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-8">
          <CartoonCard className="bg-amber-50 border-amber-300">
            <Sparkles className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <h3 className="text-2xl font-black text-amber-700">(Abrindo… 💥) Tesouro liberado!</h3>
            <p className="text-gray-700 font-bold mt-4">
              Você ganhou <strong>+10 artes no seu tema</strong> + uma dica VIP pra vender rápido do zero.
            </p>
            <p className="text-rose-500 font-black mt-6 italic text-xl">Nível up, guerreira!</p>
          </CartoonCard>
          <CartoonButton onClick={() => onNext()} className="w-full">
            Ganhar Meu Desconto! ➡️
          </CartoonButton>
        </motion.div>
      )}
    </div>
  );
};

export const DiscountBoxStep: React.FC<StepProps & { state: GameState, updateState: any }> = ({ state, updateState, onNext }) => {
  const [revealed, setRevealed] = useState<number | null>(null);
  const [lastClickedBox, setLastClickedBox] = useState<number | null>(null);

  const chooseBox = (num: number) => {
    const isFirstAttempt = (state?.discountAttempt || 0) === 0;
    const pct = isFirstAttempt ? 40 : 70;
    
    setRevealed(pct);
    setLastClickedBox(num);
    
    if (pct === 70) {
      updateState({ discountAttempt: (state?.discountAttempt || 0) + 1 });
      setTimeout(() => {
        confetti({ particleCount: 200, spread: 100, colors: ['#f43f5e', '#fbbf24'] });
      }, 500);
    } else {
      updateState({ discountAttempt: (state?.discountAttempt || 0) + 1 });
    }
  };

  return (
    <div className="text-center space-y-8 py-6">
      <h2 className="text-3xl font-black text-rose-600">Hora do grande prêmio! 🎁</h2>
      <p className="text-gray-700 font-bold">Escolha uma caixa surpresa pra revelar seu desconto:</p>

      {!revealed && (
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((num) => {
            if ((state?.discountAttempt || 0) > 0 && num === lastClickedBox) return <div key={num} className="h-40" />;
            
            return (
              <motion.button
                key={num}
                whileHover={{ y: -10, rotate: [0, 5, -5, 0] }}
                onClick={(e) => {
                  if (e && e.preventDefault) e.preventDefault();
                  if (e && e.stopPropagation) e.stopPropagation();
                  chooseBox(num);
                }}
                className="bg-white h-40 rounded-[2.5rem] border-4 border-rose-100 flex flex-col items-center justify-center gap-3 cartoon-shadow"
              >
                <div className="bg-rose-50 p-4 rounded-full pointer-events-none">
                  <Gift className="w-12 h-12 text-rose-500" />
                </div>
                <span className="text-sm font-black text-rose-600 uppercase pointer-events-none">Caixa {num}</span>
              </motion.button>
            );
          })}
        </div>
      )}

      {revealed === 40 && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <CartoonCard className="bg-rose-50 border-rose-200 p-8">
            <p className="text-3xl font-black text-rose-700">Quase lá! Ganhou 40% off…</p>
            <p className="text-gray-700 font-bold mt-4">Mas você merece mais! Te dou uma SEGUNDA CHANCE GRÁTIS porque acredito na sua vitória. 💪</p>
          </CartoonCard>
          <CartoonButton onClick={() => setRevealed(null)} className="w-full">
            Escolher outra caixa agora! 🍀
          </CartoonButton>
        </motion.div>
      )}

      {revealed === 70 && (
        <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="space-y-8">
          <CartoonCard className="bg-green-50 border-green-300 p-10 relative overflow-hidden">
            <div className="absolute -top-4 -right-4 bg-yellow-400 p-8 rotate-12 shadow-lg">
                <Star className="text-white fill-current w-10 h-10" />
            </div>
            <h3 className="text-5xl font-black text-green-700 drop-shadow-sm">PARABÉNS! 🚀</h3>
            <p className="text-3xl font-black text-green-600 mt-4">70% OFF desbloqueado!</p>
          </CartoonCard>
          <CartoonButton onClick={() => onNext()} className="w-full">
            Continuar para Bônus! ➡️
          </CartoonButton>
        </motion.div>
      )}
    </div>
  );
};

export const BonusRouletteStep: React.FC<StepProps & { state: GameState, updateState: any }> = ({ state, updateState, onNext }) => {
  const [spinning, setSpinning] = useState(false);
  const [bonus, setBonus] = useState<string | null>(null);

  const bonuses = [
    '+20 artes grátis',
    'Acesso ao grupo VIP',
    'Dica secreta faturar R$1000',
    'Multiplicador de vendas'
  ];

  const spin = () => {
    setSpinning(true);
    setTimeout(() => {
      const win = bonuses[Math.floor(Math.random() * bonuses.length)];
      setBonus(win);
      updateState({ 
        unlockedBonus: win,
        points: (state?.points || 0) + 15,
        badges: [...(state?.badges || []), 'Riscadora Mestra'] 
      });
      setSpinning(false);
      confetti({ particleCount: 100, spread: 100, colors: ['#fbbf24', '#f43f5e'] });
    }, 2000);
  };

  return (
    <div className="text-center py-6 space-y-8">
      <h2 className="text-3xl font-black text-rose-600">A sorte continua! 🎡</h2>
      <p className="text-gray-700 font-bold italic">Gire para turbinar sua jornada com bônus ÉPICOS!</p>
      
      <div className="relative w-60 h-60 mx-auto">
        <div className={`w-full h-full rounded-full border-8 border-dashed border-yellow-400 flex items-center justify-center bg-white shadow-xl ${spinning ? 'animate-spin' : ''}`}>
          <Zap className="w-16 h-16 text-yellow-500 fill-current animate-pulse" />
        </div>
        <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-rose-500 rounded-full border-4 border-white shadow-lg"></div>
      </div>

      {!bonus && (
        <CartoonButton
          onClick={() => spin()}
          disabled={spinning}
          className="w-full"
        >
          {spinning ? 'Ganhando Mais...' : 'Girar Roleta de Bônus! 🎁'}
        </CartoonButton>
      )}

      {bonus && (
        <motion.div initial={{ scale: 0.8, y: 20 }} animate={{ scale: 1, y: 0 }} className="space-y-6">
          <div className="bg-rose-600 text-white p-8 rounded-[3rem] cartoon-shadow-lg border-b-8 border-rose-900">
            <p className="text-xs uppercase tracking-[0.2em] font-black opacity-80 mb-2">Prêmio Revelado</p>
            <h3 className="text-3xl font-black">{bonus}! 🚀</h3>
          </div>
          <p className="text-rose-600 font-black text-xl tracking-wide">Nível 3 concluído – Total: {state?.points} pontos!</p>
          <CartoonButton onClick={() => onNext()} className="w-full">
            Imprimir minha sorte!
          </CartoonButton>
        </motion.div>
      )}
    </div>
  );
};

export const ScratchCardStep: React.FC<StepProps & { state: GameState, updateState: any }> = ({ state, updateState, onNext }) => {
  const [scratched, setScratched] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#CBD5E0';
    ctx.roundRect ? ctx.roundRect(0, 0, canvas.width, canvas.height, 20) : ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    ctx.fillStyle = '#A0AEC0';
    ctx.font = 'bold 24px Fredoka';
    ctx.textAlign = 'center';
    ctx.fillText('RISQUE AQUI ✨', canvas.width / 2, canvas.height / 2 + 10);

    let isDrawing = false;
    const scratch = (e: any) => {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
      const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
      
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 25, 0, Math.PI * 2);
      ctx.fill();

      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let count = 0;
      for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3] === 0) count++;
      }
      if (count > (pixels.length / 4) * 0.5) {
        setScratched(true);
      }
    };

    const startDrawing = (e: any) => {
      if (e && e.cancelable) e.preventDefault();
      isDrawing = true;
    };
    const endDrawing = (e: any) => {
      if (e && e.cancelable) e.preventDefault();
      isDrawing = false;
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', endDrawing);
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('touchstart', startDrawing, { passive: false });
    canvas.addEventListener('touchend', endDrawing, { passive: false });
    canvas.addEventListener('touchmove', (e) => {
      if (e && e.cancelable) e.preventDefault();
      scratch(e);
    }, { passive: false });

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mouseup', endDrawing);
      canvas.removeEventListener('mousemove', scratch);
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchend', endDrawing);
    };
  }, []);

  return (
    <div className="text-center py-6 space-y-8">
      <h2 className="text-3xl font-black text-rose-600">Risque sua sorte! ✨</h2>
      <p className="text-gray-700 font-bold">Arraste o dedo abaixo pra revelar seu bônus surpresa…</p>
      
      <div className="relative mx-auto w-full max-w-[320px] h-48 bg-white rounded-[2.5rem] overflow-hidden border-8 border-yellow-200 shadow-2xl flex items-center justify-center cartoon-shadow">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-rose-600 font-black text-center p-6 bg-yellow-50">
          <Star className="text-yellow-400 fill-current mb-2" />
          <p className="text-lg leading-tight uppercase">Revelado: +5 mockups prontos pra stories!</p>
          <div className="mt-4 bg-rose-500 text-white text-[10px] py-1 px-3 rounded-full font-black">BADGE DESBLOQUEADO</div>
        </div>
        {!scratched && (
          <canvas ref={canvasRef} width={320} height={192} className="absolute inset-0 touch-none z-10 cursor-crosshair" />
        )}
      </div>

      {scratched && (
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="bg-yellow-400 p-5 rounded-[2rem] flex items-center gap-4 justify-center border-4 border-white shadow-lg">
            <Trophy className="text-white w-8 h-8" />
            <span className="font-black text-white text-xl">Nível 4 Concluído! 🏅</span>
          </div>
          <CartoonButton onClick={() => {
            updateState({ badges: [...(state?.badges || []), 'Guerreira Sortuda'] });
            onNext();
          }} className="w-full">
            Ver Minha Coleção! 🏆
          </CartoonButton>
        </motion.div>
      )}
    </div>
  );
};

export const BadgeCollectionStep: React.FC<StepProps & { state: GameState }> = ({ state, onNext }) => {
  const allBadges = [
    { id: 'Sonhadora Financeira', icon: Target, level: '1', color: 'bg-rose-400' },
    { id: 'Estilista Personalizada', icon: Heart, level: '2', color: 'bg-amber-400' },
    { id: 'Tesoureira da Sorte', icon: Gift, level: '3', color: 'bg-yellow-400' },
    { id: 'Riscadora Mestra', icon: Zap, level: '4', color: 'bg-rose-600' }
  ];

  return (
    <div className="space-y-8 pt-6">
      <h2 className="text-3xl font-black text-rose-600 text-center leading-tight">Sua Coleção, {state?.userName}! 🏆</h2>
      <div className="grid grid-cols-2 gap-4">
        {allBadges.map((b) => (
          <motion.div 
            key={b.id} 
            whileHover={{ rotate: [0, -5, 5, 0] }}
            className="bg-white p-5 rounded-[2rem] border-4 border-yellow-100 flex flex-col items-center text-center gap-2 shadow-sm cartoon-shadow"
          >
             <div className={`${b.color} p-4 rounded-full border-4 border-white shadow-md pointer-events-none`}>
                <b.icon className="w-8 h-8 text-white" />
             </div>
             <p className="text-[10px] font-black text-yellow-500 uppercase pointer-events-none">Nível {b.level}</p>
             <p className="text-xs font-black text-gray-800 leading-tight pointer-events-none">{b.id}</p>
          </motion.div>
        ))}
      </div>
      <div className="bg-gradient-to-r from-rose-500 to-rose-600 p-8 rounded-[3rem] text-white text-center cartoon-shadow-lg border-b-8 border-rose-800">
        <p className="text-xs font-black opacity-80 tracking-widest uppercase mb-1">Multiplicador Final</p>
        <p className="text-6xl font-black">x1.5</p>
        <p className="text-sm mt-2 font-bold opacity-90">(por engajamento épico!)</p>
      </div>
      <CartoonButton onClick={() => onNext()} className="w-full">
        Ir para Oferta Final! <Timer className="w-6 h-6" />
      </CartoonButton>
    </div>
  );
};

export const PreviewsStep: React.FC<StepProps & { state: GameState }> = ({ state, onNext }) => {
  const STYLE_PREVIEWS: Record<SlipperStyle, string[]> = {
    flores: [
      'https://i.postimg.cc/4dbJRy9N/daf02641d049e66b8c5cb77bfafc108d.jpg',
      'https://i.postimg.cc/vTYGYyr0/6b879f5ae72d04e182164db58a0d45c1.jpg',
      'https://i.postimg.cc/J7x1Ty8d/5a4f75b2ddf25532c73f83c6b42cc3c9.jpg',
      'https://i.postimg.cc/nLqxqrT6/90d1748d1356da709139d16e5149d321.jpg'
    ],
    religioso: [
      'https://i.postimg.cc/C50c36sv/907e5a507038ccd323f22cae49da237e.jpg',
      'https://i.postimg.cc/T1NvTDYK/f810343b9007109661d3d42b194f09e9.jpg',
      'https://i.postimg.cc/mZmsY0Ns/ef5a5e5cdf85c7cef0b5d4ed09aa1442.jpg',
      'https://i.postimg.cc/jjY0qKKX/a7dbb9009c94214b84014e8694fabfe4.jpg'
    ],
    frases: [
      'https://i.postimg.cc/PJx0V5zh/3dac34d2767e49cf206af11b01a30e00.jpg',
      'https://i.postimg.cc/sf6kQ5s2/5a748ff4048e9247e8861790bf98ac26.jpg',
      'https://i.postimg.cc/YqTT8k4w/095989c30a3195fe9c34df5350b57f4b.jpg',
      'https://i.postimg.cc/KzcW48WN/184ea1ab452c57498c9dc842dd4bfa94.jpg'
    ],
    festas: [
      'https://i.postimg.cc/NGznfYkF/89c41857e3f8be78a4003e4793ebabbc.jpg',
      'https://i.postimg.cc/t40mW5cS/7f697c3cfc43ac0d3515c5e0bc54a1ca.jpg',
      'https://i.postimg.cc/wjh4VN8D/a6fcf053014d6e62b4378c0c08318d27.jpg',
      'https://i.postimg.cc/J0TjpTTS/dce3a9efb8210a608b352efcd17ab9f8.jpg'
    ]
  };

  const currentPreviewImages = STYLE_PREVIEWS[state?.chosenStyle || 'flores'];

  return (
    <div className="space-y-8 py-4">
      <h2 className="text-3xl font-black text-rose-600 text-center leading-tight">Sua vitória está se materializando! ✨</h2>
      
      <CartoonCard className="p-4">
         <p className="text-xs font-black text-amber-500 uppercase mb-4 tracking-widest text-center">Preview do estilo: {state?.chosenStyle}</p>
         <div className="grid grid-cols-2 gap-3">
            {currentPreviewImages.map((img, i) => (
              <div key={i} className="relative group overflow-hidden rounded-2xl border-2 border-yellow-50 pointer-events-none">
                <img src={img} className="rounded-xl w-full h-full object-cover group-hover:scale-110 transition-transform" alt={`Preview ${i}`} />
                <div className="absolute inset-0 bg-rose-500/10"></div>
              </div>
            ))}
         </div>
      </CartoonCard>

      <CartoonButton onClick={() => onNext()} className="w-full">
        Garantir Meu Kit Agora! 🔥
      </CartoonButton>
    </div>
  );
};

export const FinalOfferStep: React.FC<StepProps & { state: GameState }> = ({ state, onNext }) => {
  const handleCheckout = () => {
    window.location.href = 'https://www.ggcheckout.com/checkout/v5/JxOcEhc57Ay25W2RUUuu';
  };

  const testimonials = [
    { 
      name: "Maria S.", 
      result: "R$ 3.000/mês", 
      profileImg: "https://i.postimg.cc/J4Pzbdr0/thispersondoesnotexist.jpg",
      resultImg: "https://i.postimg.cc/mg4FQW2m/29C2446F-5391-4E0E-87D6-E3F176790D22.png"
    },
    { 
      name: "Ana Paula", 
      result: "Primeira Venda", 
      profileImg: "https://i.postimg.cc/YSm2Br1N/thispersondoesnotexist.jpg",
      resultImg: "https://i.postimg.cc/LXGJ5rbz/4cc37f67981791df8e0d3487a2470b56.jpg"
    },
    { 
      name: "Cláudia R.", 
      result: "Retorno Imediato", 
      profileImg: "https://i.postimg.cc/7ZjDVFp6/thispersondoesnotexist.jpg",
      resultImg: "https://i.postimg.cc/bNxZYVHw/01bfe1f7fa54637aed493b95aaf84deb.jpg"
    }
  ];

  const faqData = [
    { q: "Preciso ter experiência?", a: "Absolutamente não! O kit é 100% focado em iniciantes, enviamos o modelo exato para você apenas imprimir e vender." },
    { q: "Preciso de máquina profissional?", a: "Não! Você pode começar hoje mesmo usando apenas o seu celular e materiais básicos que custam centavos." },
    { q: "Como recebo as artes?", a: "O acesso é imediato! Assim que o Pix é confirmado, o link de download chega automaticamente no seu e-mail e WhatsApp." },
    { q: "É pagamento único mesmo?", a: "Sim! Sem mensalidades ou taxas escondidas. Você paga uma única vez e as artes são suas para sempre." },
    { q: "Funciona para quem está começando do zero?", a: "Com certeza! É o atalho perfeito para quem não quer perder meses tentando criar artes sozinha." },
    { q: "Em quanto tempo posso começar a vender?", a: "Muitas alunas postam as artes bônus nos stories e já fecham as primeiras encomendas nas primeiras 24 horas!" }
  ];

  return (
    <div className="space-y-8 py-6 text-center">
      <div className="space-y-2">
        <h2 className="text-4xl font-black text-rose-600 drop-shadow-sm leading-tight">Parabéns pelo Nível Final, {state?.userName}! 🎉</h2>
      </div>

      <CartoonCard className="text-left space-y-5 p-8 relative overflow-hidden border-rose-300">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-500 w-5 h-5 shrink-0" />
            <p className="font-black text-gray-700 text-sm">100 artes prontas <span className="text-rose-500">(HD + editáveis)</span></p>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-500 w-5 h-5 shrink-0" />
            <p className="font-black text-gray-700 text-sm">bônus: {state?.unlockedBonus || 'Acesso VIP'}</p>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-500 w-5 h-5 shrink-0" />
            <p className="font-black text-gray-700 text-sm">Meu apoio exclusivo 24h</p>
          </div>
        </div>
        
        <div className="border-t-4 border-dashed border-rose-100 pt-6 text-center">
           <p className="text-gray-400 line-through font-bold text-xl italic mb-1">De R$ 99,67</p>
           <div className="flex flex-col items-center">
             <p className="text-7xl font-black text-rose-600 tracking-tighter drop-shadow-sm leading-none py-2">R$ 29,90</p>
             <div className="bg-yellow-400 px-4 py-1 rounded-full font-black text-white text-[10px] uppercase animate-bounce mt-2 shadow-sm">Única Oportunidade!</div>
           </div>
        </div>
      </CartoonCard>

      <div className="space-y-4 pt-4">
        <h3 className="text-center font-black text-rose-600 text-lg uppercase flex items-center justify-center gap-2">
          <Star className="w-5 h-5 fill-rose-500" /> Resultados Reais <Star className="w-5 h-5 fill-rose-500" />
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-4 rounded-[2rem] border-2 border-yellow-100 shadow-md flex flex-col gap-3">
               <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-rose-400 pointer-events-none">
                    <img src={t.profileImg} className="w-full h-full object-cover" alt={t.name} />
                  </div>
                  <div className="text-left">
                    <p className="font-black text-gray-800 text-sm">{t.name}</p>
                    <p className="text-rose-500 font-black text-[10px] uppercase">{t.result}</p>
                  </div>
               </div>
               <img src={t.resultImg} className="w-full h-auto rounded-xl pointer-events-none" alt="Evidência Real" />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <CartoonButton 
          onClick={() => handleCheckout()}
          className="w-full bg-green-500 border-green-700 hover:bg-green-400 h-24 text-2xl shadow-green-200"
        >
          Pagar R$ 29,90 Agora <ShoppingCart className="w-8 h-8" />
        </CartoonButton>
        <p className="text-center text-gray-500 font-bold text-xs px-8 leading-tight italic">
          Pague via Pix e receba seu acesso <span className="text-green-600">IMEDIATAMENTE</span> no seu WhatsApp e E-mail.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 bg-white/50 p-6 rounded-[2.5rem] border-2 border-yellow-100">
        <div className="flex items-center gap-2">
          <div className="bg-rose-50 p-2 rounded-full"><DownloadCloud className="text-rose-400 w-4 h-4" /></div>
          <span className="text-[10px] font-black uppercase text-gray-600 leading-tight">Produto Digital</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-rose-50 p-2 rounded-full"><ZapIcon className="text-rose-400 w-4 h-4" /></div>
          <span className="text-[10px] font-black uppercase text-gray-600 leading-tight">Entrega Imediata</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-rose-50 p-2 rounded-full"><ShieldCheck className="text-rose-400 w-4 h-4" /></div>
          <span className="text-[10px] font-black uppercase text-gray-600 leading-tight">Pagamento Seguro</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-rose-50 p-2 rounded-full"><Smartphone className="text-rose-400 w-4 h-4" /></div>
          <span className="text-[10px] font-black uppercase text-gray-600 leading-tight">Suporte 24h</span>
        </div>
      </div>

      <div className="space-y-4 pt-8">
        <h3 className="text-center font-black text-rose-600 text-lg uppercase flex items-center justify-center gap-2">
          <HelpCircle className="w-6 h-6" /> Perguntas Frequentes
        </h3>
        <CartoonCard className="p-4 bg-white/80 border-rose-100 text-left">
          {faqData.map((item, i) => (
            <FAQItem key={i} question={item.q} answer={item.a} />
          ))}
        </CartoonCard>
      </div>

      <div className="pt-12 pb-20 border-t-2 border-rose-100 space-y-8">
        <div className="space-y-3">
          <h4 className="text-3xl font-black text-rose-600 px-4">Sua independência financeira está a um clique! 💖</h4>
          <p className="text-gray-600 font-bold px-8 text-sm leading-relaxed">
            Não perca a chance de ter acesso ao material que vai transformar seu celular em uma máquina de vendas de chinelos.
          </p>
        </div>
        <div className="relative px-2">
          <CartoonButton 
            onClick={() => handleCheckout()}
            className="w-full bg-green-500 border-green-700 h-20 text-xl"
          >
            SIM! QUERO MEU KIT AGORA!
          </CartoonButton>
        </div>
      </div>
    </div>
  );
};

export const PostPurchaseStep: React.FC<{ state: GameState }> = ({ state }) => {
  useEffect(() => {
    confetti({ particleCount: 300, spread: 150, origin: { y: 0.5 }, colors: ['#fbbf24', '#f43f5e', '#ffffff'] });
  }, []);

  return (
    <div className="space-y-10 py-10 text-center h-full flex flex-col justify-center items-center">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="bg-green-400 w-32 h-32 rounded-[3rem] border-8 border-white flex items-center justify-center shadow-2xl pointer-events-none"
      >
        <Trophy className="w-16 h-16 text-white" />
      </motion.div>
      
      <h2 className="text-4xl font-black text-rose-600 leading-tight">Vitória ÉPICA, {state?.userName}! 🎉</h2>
      <p className="text-xl font-bold text-gray-800 px-6 leading-relaxed">Nível Mestre Chinelista desbloqueado! Baixe tudo agora.</p>

      <div className="bg-rose-500 p-10 rounded-[4rem] text-white shadow-2xl border-b-[12px] border-rose-800 relative max-w-sm mx-auto group">
        <div className="absolute -top-6 -right-6 bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-white rotate-12 pointer-events-none">
            <Sparkles className="text-white" />
        </div>
        <h3 className="text-2xl font-black uppercase tracking-widest mb-4">OFERTA VIP AGORA</h3>
        <p className="text-lg font-bold opacity-90 leading-snug mb-8">Quer mais? Por só <strong>R$ 19,90</strong>, leve <strong>+50 artes extras</strong> (Natal, Mães, Pais...).</p>
        <button 
          onClick={(e) => {
            if (e && e.preventDefault) e.preventDefault();
            if (e && e.stopPropagation) e.stopPropagation();
          }}
          className="w-full bg-white text-rose-600 font-black py-6 rounded-[2.5rem] text-2xl shadow-xl hover:scale-105 transition-transform active:scale-95"
        >
          Quero Mais! 🚀
        </button>
      </div>

      <div className="space-y-6">
        <p className="text-amber-600 font-black text-sm uppercase tracking-widest">
          Poste nos stories e marque <strong>@sua_conta</strong> ❤️
        </p>
        <button 
          onClick={(e) => {
            if (e && e.preventDefault) e.preventDefault();
            if (e && e.stopPropagation) e.stopPropagation();
          }}
          className="text-rose-400 font-black underline text-lg opacity-70 hover:opacity-100"
        >
          Não, quero apenas meu pacote base.
        </button>
      </div>
    </div>
  );
};