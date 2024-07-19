import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { deleteProfile } from "../../../../services/operations/settingAPI"
import { useState } from "react"
import ConfirmationModal from "../ConfirmationModal"

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleDeleteAccount() {
    try {
      dispatch(deleteProfile(token, navigate))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  const [confirmationModal, setConfirmationModal] = useState(null);


  return (
    <>
      <div className="my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-4 py-6 md:py-8 md:px-12">
        <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
          <FiTrash2 className="text-3xl text-pink-200" />
        </div>
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold text-richblack-5">
            Delete Account
          </h2>
          <div className="md:w-3/5 text-pink-25">
            <p>Would you like to delete account?</p>
            <p>
              This account may contain Paid Courses. Deleting your account is
              permanent and will remove all the contain associated with it.
            </p>
          </div>
          <button
            type="button"
            className="w-fit cursor-pointer italic text-pink-300 border border-pink-500 p-2 rounded-[10px]"
            onClick={()=>setConfirmationModal({
              Text1: "Delete Account",
              Text2: "Your account will be delete",
              btnText1: "Delete",
              btnText2: "Cancel",
              btnHandler1 : ()=>{handleDeleteAccount()},
              btnHandler2: ()=>{setConfirmationModal(null)},
            })}
          >
            I want to delete my account.
          </button>
        </div>
      </div>

      {confirmationModal ? <ConfirmationModal modalData={confirmationModal}/> : <></>}
    </>
  )
}