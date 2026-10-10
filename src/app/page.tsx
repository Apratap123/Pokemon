import PokemonList from '@/components/PokemonList';
import { Suspense } from 'react';

async function PokemonFetcher() {
  // We'll fetch the first 151 Pokemon, it's classic and works well for a demo
  // Fetching it server side to be fast
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const data = await res.json();
  return <PokemonList initialPokemon={data.results} />;
}

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-slate-900 dark:text-white mb-10 tracking-tight">
          Pokemon <span className="text-red-500">Explorer</span>
        </h1>
        <Suspense fallback={<div className="text-center py-20 text-gray-500 text-xl font-bold animate-pulse">Loading Pokedex...</div>}>
          <PokemonFetcher />
        </Suspense>
      </div>
    </main>
  );
}
