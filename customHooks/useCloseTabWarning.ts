import { useEffect } from "react";



export function useCloseTabWarning( isFormDirty: boolean )
{
    useEffect(() => {
		const warnOfDataLoss = (event: BeforeUnloadEvent) => {
			event.preventDefault();
			if (isFormDirty) {
				const confirmationMsg =
					'You will lose application progress, if you close this tab';
				// ( event || event.returnValue) = confirmationMsg;
				return confirmationMsg;
			}
			return null;
		};
		window.addEventListener('beforeunload', warnOfDataLoss);

		return () =>
			window.removeEventListener('beforeunload', warnOfDataLoss);
	}, [isFormDirty]);
}