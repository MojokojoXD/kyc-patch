import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CustomToggle } from '@/components/ui/CompoundUI/CustomToggle';
import {
	FormTitle,
	FormHeader,
	FormContent,
	FormSubHeader,
} from '@/components/forms/FormLayout';
interface UAPContentProps {
	getUAPAgreement: (decision: boolean) => void;
}

export default function UAPContent({ getUAPAgreement }: UAPContentProps) {
	const [isUAPAccepted, setIsUAPAccepted] = useState<boolean>(false);

	const handleAcceptance = () => setIsUAPAccepted((prevState) => !prevState);

	const handleSubmit = () => getUAPAgreement(isUAPAccepted);

  return (
    <div className='py-10 w-full'>
      <div className='w-full max-w-[44.75rem] mx-auto rounded-xl overflow-hidden border border-neutral-100'>
        <FormHeader>
          <FormTitle>SecondSTAX User Acceptance Policy</FormTitle>
          <FormSubHeader>
            To use this application, you must accept our User Acceptance Policy. You
            cannot proceed without accepting this policy.
          </FormSubHeader>
        </FormHeader>
        <FormContent>
          <div className='py-5 bg-neutral-50 rounded-md'>
            <div className='max-w-prose paragraph2Regular text-neutral-700 px-5 overflow-auto space-y-[12px] h-96' style={ {
              scrollbarWidth: 'thin'
            }}>
              <p>SecondSTAX has taken steps, including those below to ensure:</p>
              <ul className='list-disc pl-3'>
                <li>
                  The development of team conforms to international best practice
                  standards in team structure, code storage and version and code
                  techniques.
                </li>
                <li>
                  Engaging the services of a qualified third-party cybersecurity firm to
                  periodically perform vulnerability assessments of our system.
                </li>
                <li>
                  Prioritizing the fixing of identified vulnerabilities in system
                  development activities.
                </li>
                <li>
                  Ensuring that our specialized authentication service generates the
                  initial password which complies with the password policy stipulated with
                  norms prescribed by the Exchanges we are integrated with.
                </li>
                <li>
                  Protecting our data from potential attackers by implementing encryption
                  and tokenization technologies.
                </li>
                <li>
                  Preparing and regularly updating our cybersecurity awareness document
                  (which highlights social engineering/phishing attacks) and sharing the
                  same with staff and clients.
                </li>
              </ul>
              <p className='py-8'>
                By accessing and utilizing our KYC Application, you acknowledge your
                acceptance of this policy and agree to comply with it. If you do not
                agree with this policy, please refrain from accessing or using our KYC
                Application.
              </p>
              <h3 className='flex items-start gap-2 font-bold'>
                <span>1</span>
                <span>Definitions</span>
              </h3>
              <p>In these Terms, the following definitions shall apply:</p>
              <div className='flex flex-col gap-8 mt-8'>
                <div className='flex items-start gap-2'>
                  <p>1.1</p>
                  <p>
                    KYC Application: Refers to the application developed by SecondSTAX,
                    Inc., designed to streamline the customer data collection process and
                    facilitate the opening of trading accounts in multiple African markets.
                  </p>
                </div>
                <div className='flex items-start gap-2'>
                  <p>1.2</p>
                  <p>
                    Customer: Any person or entity accessing or using the KYC Application.
                  </p>
                </div>
                <div className='flex items-start gap-2'>
                  <p>1.3</p>
                  <p>
                    SecondSTAX: SecondSTAX, Inc., a Delaware corporation with offices at
                    251 Little Falls Drive, Wilmington, DE, 19808, USA, and its global
                    affiliates operating the KYC Application.
                  </p>
                </div>
                <div className='flex items-start gap-2'>
                  <p>1.4</p>
                  <p>
                    Services: Refers to the services provided through the KYC Application,
                    including data submission, verification, document upload, and account
                    opening form generation.
                  </p>
                </div>
              </div>
              <h3 className='flex items-start gap-2 pt-8 font-bold'>
                <span>2</span>
                <span>Access and Use of KYC Application</span>
              </h3>
              <div className='flex flex-col gap-8 mt-8'>
                <div className='flex items-start gap-2'>
                  <p>2.1</p>
                  <p>
                    Access to the KYC Application is permitted on a temporary basis, and
                    SecondSTAX reserves the right to withdraw or amend the service provided
                    without notice. SecondSTAX does not make any representation or warranty
                    that its cloud-based service will be always available to users without
                    any interruption. User organizations or their representatives shall not
                    have any claim against SecondSTAX on account of any suspension,
                    interruption, non-availability or malfunctioning of its cloud-based
                    service.
                  </p>
                </div>
                <div className='flex items-start gap-2'>
                  <p>2.2</p>
                  <p>
                    SecondSTAX may restrict access to certain parts or the entirety of the
                    KYC Application to registered customers.
                  </p>
                </div>
                <div className='flex items-start gap-2'>
                  <p>2.3</p>
                  <p>
                    Customers are responsible for maintaining the confidentiality of their
                    user identification codes, passwords, or any other security information
                    provided. Disclosure of such information to third parties is strictly
                    prohibited.
                  </p>
                </div>
                <div className='flex items-start gap-2'>
                  <p>2.4</p>
                  <p>
                    Customers must comply with this policy available when completing the
                    KYC application.
                  </p>
                </div>
              </div>
              <div>
                <h3 className='flex items-start gap-2 pt-8 font-bold'>
                  <span>3.</span>
                  <span>Compliance with Applicable Laws</span>
                </h3>
                <p>
                  Customers agree to use the KYC Application only for lawful purposes and
                  in compliance with all applicable laws and regulations.
                </p>
              </div>
              <div>
                <h3 className='flex items-start gap-2 pt-8 font-bold'>
                  <span>4.</span>
                  <span>Indemnification</span>
                </h3>
                <p>
                  Customers agree to indemnify and hold harmless SecondSTAX and its
                  subsidiaries, affiliates, and related parties from any losses, expenses,
                  damages, or costs resulting from any violation of these Terms by the
                  Customer or any other person using the Customer&apos;s account.
                </p>
              </div>
              <div>
                <h3 className='flex items-start gap-2 pt-8 font-bold'>
                  <span>5.</span>
                  <span>Variations</span>
                </h3>
                <p>
                  SecondSTAX reserves the right to revise this policy at any time without
                  prior notice. Customers are advised to review the policy periodically
                  for any updates or changes. Revised policy shall be effective upon
                  changes on the KYC Application.
                </p>
                <p>
                  By accessing or using the KYC Application, you agree to be bound by this
                  policy. If you do not agree to this policy, please refrain from
                  accessing or using the KYC Application.
                </p>
              </div>
              <div>
                <h3 className='flex items-start gap-2 pt-8 font-bold'>
                  <span>6.</span>
                  <span>Cybersecurity</span>
                </h3>
                <p className='pb-4'>
                  Users of the Know Your Customer (KYC) Application are obligated to
                  uphold stringent cybersecurity practices to ensure the protection of
                  their accounts and sensitive information. It is imperative that users
                  acknowledge their responsibility for maintaining the confidentiality and
                  security of their Username and Password. Users are solely accountable
                  for all actions carried out within the KYC Application, regardless of
                  whether authorization was granted.
                </p>
                <p className='pb-4'>
                  Recognizing the critical nature of cybersecurity in the KYC process,
                  customers must adhere to robust authentication technologies and
                  stringent security measures. This includes the safeguarding of password
                  and authentication information, ensuring it remains confidential and
                  inaccessible to any unauthorized third parties, including fellow
                  colleagues within their organization.
                </p>
                <p className='pb-4'>
                  In the event of any security concerns or suspicions regarding
                  unauthorized access or breaches within SecondSTAX&apos;s system, users
                  and their organizations are obliged to promptly notify SecondSTAX via
                  email at{' '}
                  <a
                    className='text-primary-500 underline'
                    href='mailto:questions@secondstax.info'>
                    questions@secondstax.info
                  </a>
                  . This notification should include comprehensive details regarding any
                  discovered security flaws or unauthorized access incidents, specifying
                  the date, manner, and impacted transactions resulting from such
                  breaches.
                </p>
                <p>
                  Adherence to these cybersecurity protocols is fundamental to maintaining
                  the integrity and security of the KYC Application and protecting the
                  interests of all users and their organizations.
                </p>
              </div>
              <div>
                <h3 className='flex items-start gap-2 pt-8 font-bold'>
                  <span>7.</span>
                  <span>Fraud and Money Laundering</span>
                </h3>
                <p className='pb-4'>
                  SecondSTAX AML and KYC policies are fundamental to combating money
                  laundering schemes. We comply with each market&apos;s KYC requirement
                  and make those mandatory before users access our KYC Application. Our
                  clients (investment firms) and third party platform (Metamap) perform
                  these checks in strict adherence to current regulatory requirements.
                </p>
                <ul className='list-disc pb-4 pl-3'>
                  <li>Liveness Detection Technologies</li>
                  <li>
                    Document Checking (including passports and other IDs) to detect fake ID
                    and forestall multiple usage of valid ID for separate accounts.
                  </li>
                </ul>
                <p className='pb-4'>
                  All Users are fully aware of and understand the risks associated with
                  availing of a service for processing KYC applications over the internet
                  through wireless or wired network access technology and shall be fully
                  liable and responsible for any and all acts done with their
                  username/password in any manner whatsoever.
                </p>
                <p>
                  Users and their organizations are responsible for following all Anti
                  Money Laundering/Combating the Financing of Terrorism and the Financing
                  of the Proliferation of Weapons of Mass Destruction (AML/CFT/PF)
                  guidelines in country and all our clients will also have to pass all
                  AML/CFT/PF requirements of the countries into which their KYC
                  applications are processed.
                </p>
              </div>
              <div>
                <h3 className='flex items-start gap-2 pt-8 font-bold'>
                  <span>8.</span>
                  <span>Encryption and Data Integrity</span>
                </h3>
                <p>
                  SecondSTAX implements encryption and tokenization technologies to
                  enforce safety of data in Transit and Storage. We employ best practice
                  approaches to manage encryption keys. We enforce data integrity and
                  completeness by implementing checks in all user data entry screens and
                  fields and alert the user where there is an incomplete entry.
                </p>
              </div>
              <div>
                <h3 className='flex items-start gap-2 pt-8 font-bold'>
                  <span>9.</span>
                  <span>Compliance (Regulatory)</span>
                </h3>
                <p>
                  We work closely with regulators within the markets we have presence in
                  or are looking to establish a presence in and ensure we have
                  successfully completed and passed all regulatory requirements before
                  launching and enabling KYC applications for those markets.
                </p>
              </div>
              <div>
                <h3 className='flex items-start gap-2 pt-8 font-bold'>
                  <span>10.</span>
                  <span>System Downtime</span>
                </h3>
                <p>
                  Users are aware that KYC processing over the internet involves many
                  uncertain factors and complex hardware, software, systems, communication
                  lines, peripherals, etc. that are susceptible to interruptions and
                  dislocations. SecondSTAX does not make any representation or warranty
                  that its cloud-based service will be always available to users without
                  any interruption. User organizations or their representatives shall not
                  have any claim against SecondSTAX on account of any suspension,
                  interruption, non-availability or malfunctioning of its cloud-based
                  service.
                </p>
              </div>
            </div>
          </div>
          <CustomToggle
            selected={isUAPAccepted}
            // value={'true'}
            label='I have read and understood the Terms and Conditions outlined in this
                          User Acceptance Policy document'
            onChange={handleAcceptance}
            type='checkbox'
            className='h-[76px]'
          />
          <div className='pb-8 flex justify-end'>
            <Button
              type='button'
              disabled={!isUAPAccepted}
              onClick={handleSubmit}>
              Accept & Continue
            </Button>
          </div>
        </FormContent>
      </div>
    </div>
	);
}
