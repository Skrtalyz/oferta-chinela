
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  EntryStep, 
  WelcomeStep, 
  IncomeRouletteStep, 
  StyleSelectionStep, 
  TreasureChestStep, 
  DiscountBoxStep, 
  BonusRouletteStep, 
  ScratchCardStep, 
  BadgeCollectionStep, 
  PreviewsStep, 
  FinalOfferStep, 
  PostPurchaseStep 
} from './components/FunnelSteps';
import { GameState, Step } from './types';
import { ProgressBar } from './components/ProgressBar';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    step: Step.Entry,
    userName: '',
    chosenIncome: null,
    chosenIncomeReason: null,
    chosenStyle: null,
    discountAttempt: 0,
    unlockedBonus: null,
    points: 0,
    badges: []
  });

  const nextStep = () => {
    setGameState(prev => ({ ...prev, step: prev.step + 1 }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateState = (updates: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...updates }));
  };

  const renderStep = () => {
    switch (gameState.step) {
      case Step.Entry:
        return <EntryStep onNext={nextStep} />;
      case Step.Welcome:
        return <WelcomeStep state={gameState} updateState={updateState} onNext={nextStep} />;
      case Step.IncomeRoulette:
        return <IncomeRouletteStep state={gameState} updateState={updateState} onNext={nextStep} />;
      case Step.StyleSelection:
        return <StyleSelectionStep state={gameState} updateState={updateState} onNext={nextStep} />;
      case Step.TreasureChest:
        return <TreasureChestStep state={gameState} updateState={updateState} onNext={nextStep} />;
      case Step.DiscountBox:
        return <DiscountBoxStep state={gameState} updateState={updateState} onNext={nextStep} />;
      case Step.BonusRoulette:
        return <BonusRouletteStep state={gameState} updateState={updateState} onNext={nextStep} />;
      case Step.ScratchCard:
        return <ScratchCardStep state={gameState} updateState={updateState} onNext={nextStep} />;
      case Step.BadgeCollection:
        return <BadgeCollectionStep state={gameState} onNext={nextStep} />;
      case Step.Previews:
        return <PreviewsStep state={gameState} onNext={nextStep} />;
      case Step.FinalOffer:
        return <FinalOfferStep state={gameState} onNext={nextStep} />;
      case Step.PostPurchase:
        return <PostPurchaseStep state={gameState} />;
      default:
        return <EntryStep onNext={nextStep} />;
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-white/90 shadow-2xl relative overflow-hidden flex flex-col border-x-8 border-yellow-400">
      {gameState.step > Step.Entry && gameState.step < Step.PostPurchase && (
        <ProgressBar currentStep={gameState.step} totalSteps={11} />
      )}
      
      <main className="flex-grow p-6 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={gameState.step}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="h-full flex flex-col"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
