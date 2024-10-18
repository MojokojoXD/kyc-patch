// import { Button } from '@/components/UIcomponents/ui/button';
// import SignatureUpload from './_steps/SignatureUpload';
// import BlindDisabledRatification from './_steps/BlindDisabledRatification';
// import Pep from './_steps/Pep';
// import Fatca from './_steps/Fatca';
// import KestrelTerms from './_steps/KestrelTerms';
// import KestrelNominee from './_steps/KestrelNominee';
// import AfrinvestEmailEndemnity from './_steps/AfrinvestEmailEndemnity';
// import AfrinvestPrivacyPolicy from './_steps/AfrinvestPrivacyPolicy';
// import Declarations from './_steps/Declarations';
// import CustomProgress from '@/components/UIcomponents/CompoundUI/CustomProgress';
import type { FormStage } from '@/types/Components/onboarding';

export const Disclosures: FormStage = ({
	renderStep,
	// currentStepIndex
}) => {
	// const [currentStep] = useState<number>(0);

	// const prevStepCache = useRef<number | null>(null);

	const getStageStep = () => {
		// switch (step) {
		// 	case DisclosuresSteps.SIGNATURE_UPLOAD:
		// 		return <SignatureUpload />;
		// 	case DisclosuresSteps.BLIND_ILLITERATE:
		// 		return <BlindDisabledRatification />;
		// 	case DisclosuresSteps.PEP:
		// 		return <Pep countryList={countryList} />;
		// 	case DisclosuresSteps.FATCA:
		// 		return <Fatca countryList={countryList} />;
		// 	case DisclosuresSteps.KESTREL_TERMS:
		// 		return <KestrelTerms />;
		// 	case DisclosuresSteps.KESTREL_NOMINEE_AGREEMENT:
		// 		return <KestrelNominee />;
		// 	case DisclosuresSteps.AFRINVEST_EMAIL_INDEMNITY:
		// 		return <AfrinvestEmailEndemnity />;
		// 	case DisclosuresSteps.DECLARATIONS:
		// 		return <Declarations />;
		// 	case DisclosuresSteps.AFRINVEST_PRIVACY_POLICY:
		// 		return <AfrinvestPrivacyPolicy />;
		// 	case DisclosuresSteps.REVIEW:
		// 		return <></>;
		// 	default:
		// 		throw new Error('step ' + step + ' is not supported');
		// }
		const SomeComponent = () => <></>;

		return SomeComponent;
	};

	return (
		<>
			{/* <CustomProgress
				maxSteps={disclosuresStepsMetadata.length}
				currentStep={currentStep}
			/> */}
            <div className='flex flex-col grow'>
                <p className='p-10'>Maintenance underway</p>
				{renderStep(getStageStep())}
			</div>
		</>
	);
};
