function User({ ava, name, color, className }) {
  return (
    <div
    className={`z-1 ${
        color === "white" ? "bg-[#FFFFFF1A]" : "bg-black/30"
      } w-[163px] h-[24px] gap-[4px] rounded-[99px] flex items-center group ${
        className ? className : ""
      }`}
    >
      <img
        src={ava}
        alt="avatar"
        className="w-[24px] h-[24px] rounded-full object-cover"
      />
      <p
        title={name}
        className="font-montserrat text-[14px] font-bold leading-[20px] tracking-[-0.03em] text-center decoration-skip-ink-none truncate overflow-hidden text-ellipsis whitespace-nowrap"
      >
        {name}
      </p>
    </div>
  );
}

export default User;
