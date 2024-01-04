export interface IUser {
  id: string
  email: string
  name: string
  paternalSurname: string
  maternalSurname: string
  role: string
  password: string
  status: boolean
  createdAt: string
  createdBy?: string | null
  updatedAt: string
  updatedBy?: string | null

  creator?: IUser | null
  updater?: IUser | null
}

export interface ICourse {
  id: string
  name: string
  details: string
  categoryId: string
  city: string
  version: string
  startDate: string
  endDate: string
  imageUrl?: string | null
  status: boolean
  createdAt: string
  createdBy?: string | null
  updatedAt: string
  updatedBy?: string | null
  
  creator?: IUser | null
  updater?: IUser | null

  category?: ICategory | null
  takenCourses?: ITakenCourse[]
}

export interface ICategory {
  id: string
  name: string
  details: string
  imageUrl?: string | null
  status: boolean
  createdAt: string
  createdBy?: string | null
  updatedAt: string
  updatedBy?: string | null

  creator?: IUser | null
  updater?: IUser | null

  courses?: ICourse[]
}

export interface ITakenCourse {
  id: string
  userId: string
  courseId: string
  status: boolean
  createdAt: string
  createdBy?: string | null
  updatedAt: string
  updatedBy?: string | null

  creator?: IUser | null
  updater?: IUser | null

  user?: IUser | null
  course?: ICourse | null
}

export interface IBilling {
  id: string
  userId: string
  nit: string
  reason: string
  status: boolean
  createdAt: string
  createdBy?: string | null
  updatedAt: string
  updatedBy?: string | null

  user?: IUser | null
  creator?: IUser | null
  updater?: IUser | null
}

export interface IDocument {
  id: string
  userId: string
  url: string
  documentTypeId: string
  status: boolean
  createdAt: string
  createdBy?: string | null
  updatedAt: string
  updatedBy?: string | null

  creator?: IUser | null
  updater?: IUser | null

  user?: IUser | null
  documentType?: ISubparameter | null
}

export interface ISubparameter {
  id: string
  name: string
  details: string
  parameterId: string
  status: boolean
  createdAt: string
  createdBy?: string | null
  updatedAt: string
  updatedBy?: string | null

  creator?: IUser | null
  updater?: IUser | null
  parameter?: IParameter | null
}

export interface IParameter {
  id: string
  name: string
  details: string
  status: boolean
  createdAt: string
  createdBy?: string | null
  updatedAt: string
  updatedBy?: string | null

  creator?: IUser | null
  updater?: IUser | null

  subparameters?: ISubparameter[]
}

export interface ITakenCourse {
  id: string
  userId: string
  courseId: string
  status: boolean
  createdAt: string
  createdBy?: string | null
  updatedAt: string
  updatedBy?: string | null

  creator?: IUser | null
  updater?: IUser | null

  user?: IUser | null
  course?: ICourse | null
}

export interface IAdvertising {
  id: string
  name: string
  description: string
  status: boolean
  createdAt: string
  createdBy?: string | null
  updatedAt: string
  updatedBy?: string | null

  creator?: IUser | null
  updater?: IUser | null

  howToFindOut?: IProgramDetail[]
}

export interface IProgramDetail {
  id: string
  userId: string
  paymentMethodId: string
  registrationConditionId: string
  howToFindOutId: string
  status: boolean
  createdAt: string
  createdBy?: string | null
  updatedAt: string
  updatedBy?: string | null

  creator?: IUser | null
  updater?: IUser | null
  user?: IUser | null

  paymentMethod?: ISubparameter | null
  registrationCondition?: ISubparameter | null
  howToFindOut?: IAdvertising | null
}

export interface IContactInfo {
  id: string
  userId: string
  phone: string
  landline: string
  department: string
  city: string
  address: string
  status: boolean
  createdAt: string
  createdBy?: string | null
  updatedAt: string
  updatedBy?: string | null

  user?: IUser | null
  creator?: IUser | null
  updater?: IUser | null
}

export interface IPersonalInfo {
  id: string
  userId: string
  ciExtensionId: string
  genderId: string
  birthDate: string
  nationality: string
  status: boolean
  createdAt: string
  createdBy?: string | null
  updatedAt: string
  updatedBy?: string | null

  creator?: IUser | null
  updater?: IUser | null
  user?: IUser | null

  ciExtension?: ISubparameter | null
  gender?: ISubparameter | null
}

export interface IWorkInfo {
  id: string
  userId: string
  profession: string
  professionLevelId: string
  institutionTitle: string
  jobAddress: string
  position: string
  status: boolean
  createdAt: string
  createdBy?: string | null
  updatedAt: string
  updatedBy?: string | null
    
  user?: IUser | null
  creator?: IUser | null
  updater?: IUser | null

  professionLevel?: ISubparameter | null
}
