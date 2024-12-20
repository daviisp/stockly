type TitleWithSubtitleProps = {
  title: string;
  subtitle: string;
};

export const TitleWithSubtitle = ({
  title,
  subtitle,
}: TitleWithSubtitleProps) => {
  return (
    <div className="flex flex-col gap-2 mb-5">
      <span className="text-[#00A180] text-xs font-semibold">{subtitle}</span>
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );
};
