import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { ClientTabData } from '../../../clients';
import { ClientLog } from './ClientLog';
import { ClientDetails } from './ClientDetails';

interface ClientTabsProps {
	client: ClientTabData;
}

export function ClientTabs( { client }: ClientTabsProps )
{
	const { logs, ...clientBio } = client ;

	const tabBtnClx =
        'data-[state=active]:bg-neutral-100 data-[state=active]:border-b heading6SMedium rounded-none py-[16px] border-neutral-700 w-full ';

	return (
		<Tabs
			defaultValue='client details'
			className='w-full text-neutral-700 space-y-[40px] h-full'>
			<TabsList className='w-full border-b border-neutral-100 h-[51px] px-0'>
				<TabsTrigger
					value='client details'
					className={tabBtnClx}>
					Client Details
				</TabsTrigger>
				<TabsTrigger
					value='logs'
					className={tabBtnClx}>
					Logs
				</TabsTrigger>
			</TabsList>
			<TabsContent value='client details'>
				<ClientDetails {...clientBio} />
			</TabsContent>
			<TabsContent value='logs'>
				<ClientLog logs={logs} />
			</TabsContent>
		</Tabs>
	);
}
