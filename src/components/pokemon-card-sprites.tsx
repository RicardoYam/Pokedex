interface Props {
  pokemonFrontImage: string | undefined;
  pokemonBackImage: string | undefined;
  pokemonCardStatic: string;
}

const PokemonCardSprites = ({
  pokemonFrontImage,
  pokemonBackImage,
  pokemonCardStatic,
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-2xl font-bold" style={{ color: pokemonCardStatic }}>
        Sprites
      </p>

      <div className="grid grid-cols-3">
        <img src={pokemonFrontImage} alt={"pokemonImage front"} width={150} />
        <img src={pokemonBackImage} alt={"pokemonImage front"} width={150} />
      </div>
    </div>
  );
};

export default PokemonCardSprites;
