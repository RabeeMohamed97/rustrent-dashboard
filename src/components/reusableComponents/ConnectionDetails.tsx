import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import SocialIcons from '../Icon/Socialicons';
import ChangePasswordIcon from '../Icon/ChangePasswordIcon';
import ProfileIcon from '../Icon/ProfileIcon';
import ProfileForm from '../../pages/Settings/Profile/Profile';
import ChangePasswordForProfile from '../../pages/Settings/ChangePassword/ChangePasswordForProfile';
import Social_Media from '../../pages/Settings/Social_Media/Social_Media';



export default function CustomConnection() {
    return (
<div className="mb-5 flex flex-col sm:flex-row">
      <Tab.Group className="w-full">
        <div className="mx-10 mb-5 sm:mb-0">
          <Tab.List className="mt-3 grid grid-cols-3 gap-2  bg-[#F5F5F5] dark:border-[#191e3a]">
            <Tab as={Fragment}>
              {({ selected }) => (
                  <button
                className={`${selected ? 'bg-custom-gradient text-white !outline-none' : ''} -mb-[1px] hover:bg-custom-gradient  hover:text-white  rounded-lg p-3  before:inline-block    w-[50%]`}
                >
                    <ProfileIcon/>
                    Profile
                  </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                className={`${selected ? 'bg-custom-gradient text-white !outline-none' : ''} -mb-[1px] hover:bg-custom-gradient hover:text-white  rounded-lg p-3  before:inline-block    w-[50%]`}
                >
            <SocialIcons/>

                  Social Media
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (

                <button
                  className={`${selected ? 'bg-custom-gradient text-white !outline-none' : ''} -mb-[1px] hover:bg-custom-gradient hover:text-white  rounded-lg p-3  before:inline-block    w-[50%]`}
                >
    
<ChangePasswordIcon/>


Change Password                </button>

              )}
            </Tab>
          </Tab.List>
        </div>

        <Tab.Panels className="w-full">
          <Tab.Panel>
            <div className="active w-full">
              <ProfileForm/>
            
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <Social_Media/>
          </Tab.Panel>
          <Tab.Panel>
            <ChangePasswordForProfile/>
          </Tab.Panel>
        </Tab.Panels>

      </Tab.Group>
    </div>
    )
  }
  
  