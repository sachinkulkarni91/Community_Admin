import { useEffect, useState } from "react";
import Input from "./Input";
import { createInvite, getInvite, sendInvite } from "../services/invite";
import displayError from "../utils/error-toaster";
import { toast } from "react-toastify";

type Props = {
  ref: React.RefObject<HTMLDivElement | null>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}

const InviteUser = ({ref, setVisible, id} : Props) => {
  const [email, setEmail]  = useState<string>("")
  const [name, setName] = useState<string>("")
  const [link, setLink] = useState<string>("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        let invite = await getInvite(id);
        console.log('invite', invite)
        if (invite && invite.message === "This community does not have a custom invite yet") {
          invite = await createInvite(id);
          setLink(invite.link);
          console.log('invite', invite)
          console.log('Created invite:', link);
        } else {
          setLink(invite.link);
        }
      } catch (error) {
        displayError(error);
      }
    };
    fetchData();
  }, [id]);

  const handleSendInvite = async () => {
    try {
      await sendInvite(id, email, name);
      setEmail("");
      setName("");
      toast.success("Invite sent successfully!");
    } catch (error) {
      displayError(error);
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(link);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  return (
    <>    
    <div ref={ref} className="fixed top-1/2 translate-y-[-50%] left-1/2 ml-[-16.6667%] w-1/3 bg-post py-8 px-6 z-40 rounded-2xl flex flex-col">

      <div className='rounded-2xl mb-8'>
      <img className="w-full rounded-2xl" src="/assets/generic4.jpg" alt="generic image" />
      </div>
      <div className='font-bold font-condensed text-2xl text-left mb-6 text-text'>Invite a user to this community</div>
      <div className='mb-6 h-12 w-full relative'>
          <label htmlFor={id} className='top-[-14%] left-8 absolute text-xs z-10 bg-primary px-1'>Invite Link</label>
          <div className='border-1 border-text text-text items-center text-ellipsis truncate w-full h-full rounded-2xl px-4 py-2 text-left text-sm flex gap-2' id={id}><span className="w-[90%] truncate overflow-hidden">{link}</span>
            <svg className="cursor-pointer" onClick={copyToClipboard} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 -960 960 960"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240zm0-80h360v-480H360zM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80zm160-240v-480z"/></svg>
          </div>
        </div>
      <Input id="Name" type="text" label="Name" placeholder="Enter the person's name" value={name} setValue={setName} />
      <Input id="Email" type="text" label="Email" placeholder="Enter your Email" value={email} setValue={setEmail} />

      <div className='mt-8 flex justify-between'>
        <div className='py-1.5 px-3 rounded-2xl text-lightText text-sm items-center cursor-pointer' onClick={() => {setVisible(false)}}>Cancel</div>
        <button className='py-1.5 px-3 rounded-2xl text-white bg-[#00338D] flex text-sm items-center' onClick={handleSendInvite}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-arrow-right-short"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 
            .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
          />
        </svg>
        Invite User
        </button>
      </div>
    </div>
    <div className='fixed z-30 w-full h-full bg-black opacity-30 top-0 left-0'></div>
    </>
  )
}

export default InviteUser