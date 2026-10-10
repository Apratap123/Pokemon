import Link from 'next/link';
import { ArrowLeft, ArrowLeftCircle } from 'lucide-react';

interface PokemonData {
  id: number;
  name: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  moves: Array<{
    move: {
      name: string;
    };
  }>;
  height: number;
  weight: number;
}

// We can define type colors for better visual flair
const typeColors: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-orange-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-cyan-300',
  fighting: 'bg-red-600',
  poison: 'bg-purple-500',
  ground: 'bg-amber-600',
  flying: 'bg-indigo-300',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-yellow-700',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-600',
  dark: 'bg-slate-700',
  steel: 'bg-slate-400',
  fairy: 'bg-pink-300',
};

import { Suspense } from 'react';

async function PokemonDataFetcher({ id }: { id: string }) {
  // fetching directly on the server ensures good performance and SEO
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  
  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Pokemon not found!</h1>
          <Link href="/" className="text-blue-500 hover:underline">Return home</Link>
        </div>
      </div>
    );
  }

  const pokemon: PokemonData = await res.json();
  const imageUrl = pokemon.sprites.other['official-artwork'].front_default;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Pokedex
        </Link>

        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden">
          {/* Header section with background based on primary type */}
          <div className={`${typeColors[pokemon.types[0].type.name] || 'bg-slate-500'} h-32 md:h-48 relative`}>
            <div className="absolute -bottom-16 md:-bottom-24 left-1/2 transform -translate-x-1/2">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-white dark:bg-slate-800 p-2 shadow-lg flex items-center justify-center">
                <img 
                  src={imageUrl} 
                  alt={pokemon.name}
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </div>
            </div>
          </div>

          <div className="pt-20 md:pt-28 pb-10 px-6 md:px-12 text-center">
            <h1 className="text-4xl md:text-5xl font-black capitalize text-slate-900 dark:text-white mb-2">
              {pokemon.name}
            </h1>
            <p className="text-lg font-mono text-slate-500 mb-6">
              #{pokemon.id.toString().padStart(3, '0')}
            </p>

            {/* Types */}
            <div className="flex justify-center gap-3 mb-10">
              {pokemon.types.map((t) => (
                <span 
                  key={t.type.name}
                  className={`${typeColors[t.type.name] || 'bg-slate-500'} text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider shadow-sm`}
                >
                  {t.type.name}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              {/* Left Column: Stats */}
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center text-slate-900 dark:text-white">
                  Base Stats
                </h2>
                <div className="space-y-4">
                  {pokemon.stats.map((stat) => (
                    <div key={stat.stat.name}>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="capitalize text-slate-700 dark:text-slate-300">{stat.stat.name.replace('-', ' ')}</span>
                        <span className="font-mono">{stat.base_stat}</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                        <div 
                          className={`${typeColors[pokemon.types[0].type.name] || 'bg-blue-500'} h-2 rounded-full`}
                          style={{ width: `${Math.min(100, (stat.base_stat / 255) * 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Details */}
              <div className="space-y-8">
                {/* Physical info */}
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-6 grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">Height</h3>
                    <p className="text-lg font-medium">{(pokemon.height / 10).toFixed(1)} m</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">Weight</h3>
                    <p className="text-lg font-medium">{(pokemon.weight / 10).toFixed(1)} kg</p>
                  </div>
                </div>

                {/* Abilities */}
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-6">
                  <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Abilities</h2>
                  <div className="flex flex-wrap gap-2">
                    {pokemon.abilities.map((a) => (
                      <span 
                        key={a.ability.name}
                        className="bg-white dark:bg-slate-600 px-3 py-1 rounded-lg text-sm font-medium capitalize border border-slate-200 dark:border-slate-500 shadow-sm"
                      >
                        {a.ability.name.replace('-', ' ')} {a.is_hidden && '(Hidden)'}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Moves section - just showing a few so it doesn't take up the entire page */}
            <div className="mt-8 bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-6 text-left">
              <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Notable Moves</h2>
              <div className="flex flex-wrap gap-2">
                {pokemon.moves.slice(0, 15).map((m) => (
                  <span 
                    key={m.move.name}
                    className="bg-white dark:bg-slate-600 px-3 py-1 rounded-lg text-sm capitalize border border-slate-200 dark:border-slate-500"
                  >
                    {m.move.name.replace('-', ' ')}
                  </span>
                ))}
                {pokemon.moves.length > 15 && (
                  <span className="px-3 py-1 text-sm text-slate-500">
                    + {pokemon.moves.length - 15} more
                  </span>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default async function PokemonDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xl font-bold text-gray-500 animate-pulse">Loading Pokemon...</div>}>
      <PokemonDataFetcher id={id} />
    </Suspense>
  );
}
