export default function StepBar({ currentStep, formSections, setCurrentStep }) {
  const steps = Object.values(formSections);

  return (
    <div className="w-full py-4">
      <div className="flex justify-between">
        {steps.map((step, i) => (
          <div key={step.id} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer
                  ${
                    currentStep === step.id
                      ? "bg-blue-500 text-white"
                      : currentStep > step.id
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
              onClick={() => setCurrentStep(step.id)}
            >
              {currentStep > step.id ? "✓" : step.id}
            </div>
            <div className="text-xs mt-1 font-medium text-gray-600">
              {step.title}
            </div>
          </div>
        ))}
      </div>

      <div className="relative mt-2">
        <div className="absolute top-0 h-1 w-full bg-gray-200 rounded"></div>
        <div
          className="absolute top-0 h-1 bg-blue-500 rounded transition-all duration-300"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
}
