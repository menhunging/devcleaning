// import { useEffect, useState } from "react";

// import type { Option } from "@/types/ui/select/select";
// import type { SingleValue } from "react-select";
// import type { Appeal } from "@/types/appeals/appeals";

// import { useAppDispatch } from "@/store/store";
// import { getObjectById } from "@/store/slices/objectSlice";

// import Modal from "@/components/shared/ui/Modal/Modal";
// import SelectUI from "@/components/shared/ui/Select/SelectUI/SelectUI";
// import { usePlannerOptions } from "@/hook/usePlannerOptions/usePlannerOptions";
// import TimePickerStartEnd from "@/components/shared/ui/DatePicker/TimePickerStartEnd/TimePickerStartEnd";
// import DatePickerStart from "@/components/shared/ui/DatePicker/DatePickerStart/DatePickerStart";

// import "./AppealsPopup.scss";

// interface AppealsPopupProps {
//   mode?: "add" | "edit";
//   loading: boolean;
//   initialData?: Appeal | null;
//   isOpen: boolean;
//   handleModalClose: () => void;
//   onSubmit: (props: Appeal) => void;
// }

// const AppealsPopup: React.FC<AppealsPopupProps> = ({
//   mode,
//   loading,
//   initialData,
//   isOpen,
//   handleModalClose,
//   onSubmit,
// }) => {
//   const initFormData = (initialData?: Appeal | null) => ({
//     id: initialData?.id || null,
//     name: initialData?.name || "",
//     description: initialData?.description || "",

//     id_object: initialData?.id_object || "",
//     name_object: initialData?.name_object || "",

//     id_zone: initialData?.id_zone || "",
//     name_zone: initialData?.name_zone || "",

//     id_user: initialData?.id_user || "",
//     name_user: initialData?.name_user || "",
//     surname_user: initialData?.surname_user || "",

//     status: initialData?.status || 0,
//     name_status: initialData?.name_status || "",

//     id_team: initialData?.id_team || "",
//     name_team: initialData?.name_team || "",

//     data_create: initialData?.data_create || "",

//     date_start: initialData?.date_start || "",
//     time_start: initialData?.time_start || "",
//     data_end: initialData?.data_end || "",
//     time_end: initialData?.time_end || "",
//   });

//   const [formData, setFormData] = useState(initFormData(initialData));

//   const [activeTab, setActiveTab] = useState<"user" | "team">(
//     formData.name_team ? "team" : "user"
//   );

//   const { optionsObjects, optionsZones, optionsUsers, optionsTeams } =
//     usePlannerOptions();

//   const dispatch = useAppDispatch();

//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleObjectSelect = async (selected: SingleValue<Option>) => {
//     setFormData((prev) => ({
//       ...prev,
//       name_zone: "",
//     }));

//     const result = await dispatch(getObjectById(String(selected?.value)));

//     if (getObjectById.fulfilled.match(result)) {
//       setFormData((prev) => ({
//         ...prev,
//         id_object: selected ? selected.value : "",
//         name_object: selected ? selected.label : "",
//         name_zone: "",
//       }));
//     }
//   };

//   const handleZoneSelect = async (selected: SingleValue<Option>) => {
//     setFormData((prev) => ({
//       ...prev,
//       id_zone: selected ? selected.value : "",
//       name_zone: selected ? selected.label : "",
//     }));
//   };

//   const handleUsersSelect = async (selected: SingleValue<Option>) => {
//     setFormData((prev) => ({
//       ...prev,
//       id_user: selected ? selected.value : "",
//       name_user: selected ? selected.label : "",
//       id_team: "",
//       name_team: "",
//     }));
//   };

//   const handleTeamSelect = async (selected: SingleValue<Option>) => {
//     setFormData((prev) => ({
//       ...prev,
//       id_team: selected ? selected.value : "",
//       name_team: selected ? selected.label : "",
//       id_user: "",
//       name_user: "",
//     }));
//   };

//   const handeSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   const btnDisabled =
//     loading ||
//     !formData.name ||
//     !formData.id_object ||
//     !formData.id_zone ||
//     !(formData.id_team || formData.id_user) ||
//     !formData.description ||
//     !formData.date_start ||
//     !formData.time_start ||
//     !formData.time_end;

//   useEffect(() => {
//     setFormData(initFormData(initialData));
//   }, [initialData]);

//   return (
//     <Modal isOpen={isOpen} onClose={handleModalClose}>
//       <div className="popup-appeals">
//         <div className="popup-appeals__head">
//           {mode === "edit" ? formData.name : "Новое обращение"}
//         </div>

//         <form className="popup-appeals__form" onSubmit={handeSubmit}>
//           <div className="popup-appeals__col">
//             <div className="input-item">
//               <label htmlFor="name">Название</label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div className="input-item">
//               <div className="selectWrap">
//                 <label htmlFor="address">Объект</label>
//                 <div className="selectWrap__wrap">
//                   <SelectUI
//                     options={optionsObjects}
//                     onChange={(event) => {
//                       handleObjectSelect(event);
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div
//               className={
//                 formData.name_object
//                   ? "input-item"
//                   : "input-item input-item--disabled"
//               }
//             >
//               <div className="selectWrap">
//                 <label htmlFor="address">Зона</label>
//                 <div className="selectWrap__wrap">
//                   <SelectUI
//                     options={optionsZones}
//                     onChange={(event) => {
//                       handleZoneSelect(event);
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="popup-appeals__users">
//               <>
//                 <div className="popup-appeals__users__tabs">
//                   <span
//                     className={activeTab === "user" ? "active" : ""}
//                     onClick={() => setActiveTab("user")}
//                   >
//                     исполнитель
//                   </span>
//                   <span
//                     className={activeTab === "team" ? "active" : ""}
//                     onClick={() => setActiveTab("team")}
//                   >
//                     команда
//                   </span>
//                 </div>

//                 {activeTab === "user" && (
//                   <div
//                     className={
//                       formData.name_zone
//                         ? "input-item"
//                         : "input-item input-item--disabled"
//                     }
//                   >
//                     <div className="selectWrap">
//                       <label htmlFor="address">Сотрудники</label>
//                       <div className="selectWrap__wrap">
//                         <SelectUI
//                           options={optionsUsers}
//                           onChange={handleUsersSelect}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {activeTab === "team" && (
//                   <div
//                     className={
//                       formData.name_zone
//                         ? "input-item"
//                         : "input-item input-item--disabled"
//                     }
//                   >
//                     <div className="selectWrap">
//                       <label htmlFor="address">Команда</label>
//                       <div className="selectWrap__wrap">
//                         <SelectUI
//                           options={optionsTeams}
//                           onChange={handleTeamSelect}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </>
//             </div>

//             <div className="input-item">
//               <label htmlFor="name">Описание обращения</label>
//               <textarea
//                 id="description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//               ></textarea>
//             </div>
//           </div>

//           <div className="popup-appeals__col">
//             <div className="input-date">
//               <label htmlFor="date_start">Дата исполнения:</label>

//               {!formData.date_start && (
//                 <span className="input-date__title">Выбрать день</span>
//               )}

//               <DatePickerStart formData={formData} setFormData={setFormData} />
//             </div>

//             <div className="input-date">
//               <label htmlFor="date_start">Время исполнения:</label>
//               <TimePickerStartEnd
//                 formData={formData}
//                 setFormData={setFormData}
//               />
//             </div>
//           </div>
//           <div className="btn-controls btn-controls--right">
//             <button
//               type="button"
//               className="btn btn--transparent"
//               onClick={handleModalClose}
//             >
//               Отмена
//             </button>
//             <button
//               type="submit"
//               className="btn btn--green"
//               disabled={btnDisabled}
//             >
//               {loading
//                 ? "Сохранение..."
//                 : mode === "edit"
//                 ? "Сохранить изменения"
//                 : "Применить"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </Modal>
//   );
// };

// export default AppealsPopup;
