'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonListProps {
  initialPokemon: Pokemon[];
}

export default function PokemonList({ initialPokemon }: PokemonListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPokemon = initialPokemon.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto">
      <div className="relative w-full max-w-xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search Pokemon..."
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-2xl leading-5 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {filteredPokemon.length > 0 ? (
          filteredPokemon.map((pokemon) => {
            const id = pokemon.url.split('/').filter(Boolean).pop();
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

            return (
              <Link
                href={`/pokemon/${id}`}
                key={pokemon.name}
                className="group flex flex-col items-center bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
              >
                <div className="relative w-full aspect-square bg-gray-50 dark:bg-slate-700 rounded-xl mb-4 p-4 overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={pokemon.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <h2 className="text-lg font-bold text-gray-800 dark:text-white capitalize">
                  {pokemon.name}
                </h2>
                <span className="text-xs text-gray-500 font-mono mt-1">
                  #{id?.toString().padStart(3, '0')}
                </span>
              </Link>
            );
          })
        ) : (
          <div className="col-span-full py-20 text-center text-gray-500">
            <p className="text-xl">No Pokemon found!</p>
            <p className="text-sm mt-2">Try adjusting your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
