import React, { useState } from 'react';
import { Card } from '../card/card';
import ContactImg from '../../assets/img/contacts.png';
import './contacts.css';
import { warningsInitial } from '../../data/initial_data';
import {
  isValidCheckboxTerm,
  isValidDate,
  isValidFile,
  isValidGender,
  isValidName,
} from '../../utils/validation';
import { Modal } from '../modal/modal';

export function Contacts(props: IFormState) {
  const [form, setStateForm] = useState(props);
  const [warn, setWarn] = useState(warningsInitial);
  const [cards, setCardStore] = useState<IFormCardStore[]>([]);

  const fieldsRefs: IFormFieldsRef | undefined = {
    inputBirthday: React.createRef(),
    inputName: React.createRef(),
    inputFile: React.createRef(),
    inputCountry: React.createRef(),
    inputMale: React.createRef(),
    inputNotification: React.createRef(),
    inputFemale: React.createRef(),
  };
  const formRef: React.RefObject<HTMLFormElement> = React.createRef();

  const getData = (): IFormFields => {
    const data = {
      inputName: fieldsRefs.inputName?.current?.value.trim(),
      inputBirthday: fieldsRefs.inputBirthday?.current?.value,
      inputCountry: fieldsRefs.inputCountry?.current?.value,
      inputMale: fieldsRefs.inputMale?.current?.checked as boolean,
      inputFemale: fieldsRefs.inputFemale?.current?.checked as boolean,
      inputNotification: fieldsRefs.inputNotification?.current?.checked as boolean,
      inputFile: fieldsRefs.inputFile?.current?.value,
    };
    return data;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleFixFilePath(fieldsRefs.inputFile?.current?.files).then(
      (path: string | null | undefined) => {
        const data = getData();

        if (!validation(data, path as string)) {
          setStateForm({ ...form, isValid: false });
          return;
        }

        setCardStore([...cards, { ...data, fixedFilePath: path as string }]);
        setStateForm({
          ...form,
          isValid: true,
        });

        successSubmission();
      }
    );
  };

  const validation = (data: IFormFields, path?: string) => {
    setWarn({
      inputName: isValidName(data.inputName),
      inputBirthday: isValidDate(data.inputBirthday),
      inputGender: isValidGender(data.inputMale, data.inputFemale),
      inputNotification: isValidCheckboxTerm(data.inputNotification),
      inputFile: isValidFile(path, data.inputFile),
    });

    if (
      isValidName(data.inputName) ||
      isValidDate(data.inputBirthday) ||
      isValidFile(path, data.inputFile) ||
      isValidGender(data.inputMale, data.inputFemale) ||
      isValidCheckboxTerm(data.inputNotification)
    ) {
      return false;
    }

    setWarn({
      ...warningsInitial,
    });
    return true;
  };

  const handleFixFilePath = async (
    files: FileList | null | undefined
  ): Promise<string | null | undefined> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      if (files && files.length > 0) {
        const file = files[0];
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          resolve(e.target?.result as string);
        };
      } else {
        resolve('');
      }
    });
  };

  const successSubmission = () => {
    setStateForm({
      ...form,
      submitStatus: 'success',
    });
    setTimeout(() => setStateForm({ ...props }), 2000);
    formRef?.current?.reset();
  };

  return (
    <div className="contacts-wrapper">
      <div className="content-wrapper">
        <h2 className="contacts-title">Contact us</h2>
        <div className="contacts-layout">
          <div className="contacts-img">
            <img src={ContactImg} alt="Contacts" className="contacts-img" />
          </div>
          <div className="contacts-form">
            <form className="form" ref={formRef}>
              <label className="form-label">
                Name:
                <input
                  type="text"
                  data-testid="name-input"
                  name="name"
                  ref={fieldsRefs.inputName}
                />
                {warn.inputName && <span className="warning-message">{warn.inputName}</span>}
              </label>
              <label className="form-label">
                Birthday:
                <input
                  type="date"
                  data-testid="date-input"
                  placeholder="yyyy-mm-dd"
                  name="birthday"
                  ref={fieldsRefs.inputBirthday}
                />
                {warn.inputBirthday && (
                  <span className="warning-message">{warn.inputBirthday}</span>
                )}
              </label>
              <label className="form-label">
                Select country:
                <select
                  name="country"
                  data-testid="select-element"
                  defaultValue="Turkey"
                  ref={fieldsRefs.inputCountry}
                >
                  <option value="Turkey" data-testid="select-option">
                    Turkey
                  </option>
                  <option value="Montenegro" data-testid="select-option">
                    Montenegro
                  </option>
                  <option value="New Zealand" data-testid="select-option">
                    New Zealand
                  </option>
                  <option value="Italy" data-testid="select-option">
                    Italy
                  </option>
                  <option value="Slovenia" data-testid="select-option">
                    Slovenia
                  </option>
                </select>
              </label>
              <div>
                Gender:
                <label className="form-label">
                  <input
                    type="radio"
                    data-testid="male-input"
                    name="gender"
                    value="Male"
                    ref={fieldsRefs.inputMale}
                  />
                  Male
                </label>
                <label className="form-label">
                  <input
                    type="radio"
                    data-testid="female-input"
                    name="gender"
                    value="Female"
                    ref={fieldsRefs.inputFemale}
                  />
                  Female
                </label>
                {warn.inputGender && <span className="warning-message">{warn.inputGender}</span>}
              </div>
              <label className="form-label">
                Choose profile picture
                <input
                  type="file"
                  name="file"
                  ref={fieldsRefs.inputFile}
                  accept="image/jpeg, image/png, image/jpg, image/*"
                />
                <button
                  type="button"
                  className="upload-btn"
                  onClick={() => fieldsRefs.inputFile?.current?.click()}
                >
                  Select file
                </button>
                {warn.inputFile && <span className="warning-message">{warn.inputFile}</span>}
              </label>
              <label className="form-label checkbox-container">
                <input
                  type="checkbox"
                  data-testid="checkbox-input"
                  name="notification"
                  className="form-input_checkbox"
                  ref={fieldsRefs.inputNotification}
                />
                <span className="notification-rule-text">I accept terms of use</span>
                {warn.inputNotification && (
                  <span className="warning-message terms">{warn.inputNotification}</span>
                )}
              </label>
              <button
                type="submit"
                className="submit-btn"
                data-testid="submit-btn-test"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="form-cards">
          {cards.map((card, index) => (
            <Card cardData={card} key={index} />
          ))}
        </div>
      </div>
      {form.submitStatus === 'success' && (
        <Modal mode="success" text="Your data has been successfully saved" />
      )}
    </div>
  );
}
