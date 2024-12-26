export const Loading = ({
  isSmall = false,
  isContainer = false,
}: {
  isSmall?: boolean;
  isContainer?: boolean;
}) => {
  return (
    <div
      className={`loading ${isSmall && 'small'} ${isContainer ? 'container' : ''}`}
    >
      <div>
        <div />
      </div>
    </div>
  );
};
