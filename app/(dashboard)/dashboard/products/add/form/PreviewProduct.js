const SpecificationRow = ({ label, value }) => (
  <div className="flex md:flow-row gap-6 text-start text-sm border-b pb-2">
    <p className="w-[300px] flex text-nowrap">{label}</p>
    <p className="text-wrap">{value}</p>
  </div>
);

const SpecificationSection = ({ title, specifications }) => (
  <div className="flex flex-col gap-5">
    <h2 className="text-start text-xl mt-3 shadow-sm text-black p-2 rounded-md font-medium">
      {title}
    </h2>
    <div className="flex flex-col gap-3">
      {specifications.map((spec, index) => (
        <SpecificationRow key={index} label={spec.label} value={spec.value} />
      ))}
    </div>
  </div>
);

export default function SpecificationPreview() {
  const sections = [
    {
      title: "Display",
      specifications: [
        { label: "Size", value: "6.75 Inch" },
        { label: "Type", value: "IPS LCD" },
        { label: "Resolution", value: "HD+ (720x1600 pixels) 260PPI" },
        { label: "Refresh Rate", value: "90Hz" },
        { label: "Brightness", value: "450 nits (Typ.)" },
        {
          label: "Features",
          value:
            "Display ratio: 20:9, Screen-to-body ratio: 90%, Contrast ratio: 1500:1 (Typ.), Color gamut: NTSC 69.3% (Typ.)",
        },
      ],
    },
    {
      title: "Processor",
      specifications: [
        { label: "Chipset", value: "MediaTek Helio G37 (12nm)" },
        { label: "CPU Type", value: "Octa-core" },
        {
          label: "CPU Speed",
          value: "4 x Cortex-A53 @ 2.3GHz + 4 x Cortex-A53 @ 1.8GHz",
        },
        { label: "GPU", value: "PowerVR GE8320" },
      ],
    },
    // Add other sections similarly
  ];

  return (
    <div className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
      <h3 className="text-2xl mb-3 font-semibold">Specification</h3>
      <div className="flex flex-col text-start">
        {sections.map((section, index) => (
          <SpecificationSection
            key={index}
            title={section.title}
            specifications={section.specifications}
          />
        ))}
      </div>
    </div>
  );
}
