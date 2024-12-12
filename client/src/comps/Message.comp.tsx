export const Message = ({
  className,
  text,
}: {
  className: string;
  text: string;
}) => {
  return (
    <div className={`message ${className}`}>
      <div />
      <p>{text}</p>
    </div>
  );
};
