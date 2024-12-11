import { useSession } from '@/components/Dashboard/hooks/useSession';
import { format } from 'date-fns';
export function SessionProfileDetails() {
	const { profile } = useSession();

	if (!profile) return null;

	const {
		user_name,
		user_email,
		user_address,
		user_city,
		user_province,
		user_postcode,
		user_country,
    user_org_name,
    user_date_last_succ_login
	} = profile;

	const formattedJoinedDate = format(
		profile.user_date_created, 'd MMM yyyy'
	);
  const lastSuccessfulLogin = user_date_last_succ_login ? format( user_date_last_succ_login, 'd MMM yyyy' ) : '';
    
	const cityProvinceZipcodeLine = `${user_city}, ${user_province} ${user_postcode}`;

	return (
		<div className='space-y-6 h-full'>
			<div className='border border-neutral-100 p-4 rounded-lg flex flex-cols justify-between gap-2'>
				<div className='space-y-2 text-neutral-500 max-w-prose'>
					<h2 className='paragraph2Medium text-neutral-700'>{user_name}</h2>
					<p className='paragraph2Regular'>{user_email}</p>
					<p className='paragraph2Regular'>Joined on {formattedJoinedDate} </p>
				</div>
				<div>
					<span className='flex justify-center items-center h-10 inline-block aspect-square rounded-md bg-primary-50 text-primary-500 paragraph2Medium border border-primary-100 cursor-default'>
						{ user_name.split(' ').reduce( ( a, c ) => a[0] + c[0] ) }
					</span>
				</div>
			</div>
			<div className='border border-neutral-100 p-4 rounded-lg space-y-2 text-neutral-500'>
				<h2 className='paragraph2Medium text-neutral-700'>Address</h2>
				<p className='paragraph2Regular'>{user_address}</p>
				<p className='paragraph2Regular'>{cityProvinceZipcodeLine}</p>
				<p className='paragraph2Regular'>{user_country}</p>
			</div>
			<div className='border border-neutral-100 p-4 rounded-lg space-y-2 text-neutral-500'>
				<h2 className='paragraph2Medium text-neutral-700'>Organization</h2>
				<p className='paragraph2Regular capitalize'>{user_org_name.toLowerCase()}</p>
			</div>
			<div className='border border-neutral-100 p-4 rounded-lg space-y-2 text-neutral-500'>
				<h2 className='paragraph2Medium text-neutral-700'>Last Successful Login</h2>
				<p className='paragraph2Regular capitalize'>{lastSuccessfulLogin}</p>
			</div>
		</div>
	);
}
