export const Loading = ({ isSmall = false }: { isSmall?: boolean }) => {
  return (
    <div className={`loading ${isSmall && 'small'}`}>
      <div>
        <div />
      </div>
    </div>
  );
};
