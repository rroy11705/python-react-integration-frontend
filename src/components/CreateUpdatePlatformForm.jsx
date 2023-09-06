import React, { useEffect, useState } from 'react'
import { useCreatePlatforms, useUpdatePlatform } from '../api/queries/platforms.queries';

const CreateUpdatePlatformForm = ({ data, modalId }) => {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [website, setWebsite] = useState('');

  const createPlatform = useCreatePlatforms();
  const updatePlatform = useUpdatePlatform()

  useEffect(() => {
    if(data) {
      setName(data?.name)
      setAbout(data?.about)
      setWebsite(data?.website)
    }
  }, [data])

  const openModal = (mId) => {
    const modal = document.getElementById(mId);

    document.body.style.overflow = "hidden";
    modal.style.display = "flex";
    modal.classList.add("modal-show");
  }

  const closeModal = (mId) => {
    const modal = document.getElementById(mId);
    if(getComputedStyle(modal).display==="flex") {
      modal.classList.add("modal-hide");
      setTimeout(() => {
        document.body.style.overflow = "initial";
        modal.classList.remove("modal-show", "modal-hide");
        modal.style.display = "none";      
      }, 200);
    }
  }

  useEffect(() => {  
    const modalTriggerButtons = document.querySelectorAll("[data-modal-target]");
    const modalCloseButtons = document.querySelectorAll(".modal-close");

    modalTriggerButtons.forEach(modalTriggerButton => {
      modalTriggerButton.addEventListener("click", () => openModal(modalTriggerButton.getAttribute("data-modal-target")));
    });
    modalCloseButtons.forEach(modalCloseButton => {
      modalCloseButton.addEventListener("click", event => closeModal(event.currentTarget.closest(".modal").id));
    });

    return () => {
      modalTriggerButtons.forEach(modalTriggerButton => {
        modalTriggerButton.removeEventListener("click", () => openModal(modalTriggerButton.getAttribute("data-modal-target")));
      });
      modalCloseButtons.forEach(modalCloseButton => {
        modalCloseButton.removeEventListener("click", event => closeModal(event.currentTarget.closest(".modal").id));
      });
    }
  })

  const handleSubmit = e => {
    e.preventDefault()
    const payload = {
      name,
      about,
      website,
      active: true
    }

    if (data?.id) {
      updatePlatform.mutateAsync({ data: payload, id: data?.id }, {
        onSuccess: () => {
          closeModal(modalId);
        }
      });
    } else {
      createPlatform.mutateAsync(payload, {
        onSuccess: () => {
          closeModal(modalId);
          setName('');
          setAbout('');
          setWebsite('');
        }
      });
    }
  }

  return (
    <div className="modal" id={modalId}>
      <div className="modal-content">
        <span className="modal-close">&times;</span>
        <h3>{data?.id ? 'Update' : 'Create'} Show</h3>
        <form autoComplete='false' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)} />
          </div>
          
          <div>
            <label htmlFor="about">About:</label>
            <textarea type="text" id="about" name="about" value={about} onChange={e => setAbout(e.target.value)}></textarea>
          </div>
        
          <div>
            <label htmlFor="website">Website:</label>
            <input type="text" id="website" name="website" value={website} onChange={e => setWebsite(e.target.value)} />
          </div>
            
          <button className="submit" type="submit">{data?.id ? 'Update' : 'Create'}</button>
        </form>
      </div>
    </div>
  )
}

export default CreateUpdatePlatformForm