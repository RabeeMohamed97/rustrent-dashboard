//components / reusableComponents/ formLayout
export type formLayoutProps = {
    children: React.ReactNode;
    title?: string;
};

//components / reusableComponents/ mainPageCard
export type MainCardProps = {
    children: React.ReactNode;
};
export type Mainlist = {
    children?: React.ReactNode;
    title?: string;

};
export type ModalProps = {
    children: React.ReactNode;
    title: string;
};

export type tabelProps={
    tabelHead:any[],
    TableBody:any[],
    Link_Navigation?:string|null,
    Page_Add?:boolean;
    Chcekbox?:boolean
    onEdit: (id:string) => void;
    onDelete: (id:string) => void;
    onView: (id:string) => void;
    onUpdate: (id:string,status:boolean) => void;
}
//components / reusableComponents/ inputComponnent
export type customInputProps = {
    label: string;
    type: string;
    placeholder: string;
    // value: string;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
    className?: string;
    required?: boolean;
    disabled?: boolean;
};
//components / reusableComponents/ NumberInput
export type customNumbersInputProps = {
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
};

//components / reusableComponents/ customSelect
export type customSelectProps = {
    options: { value: string; label: string }[];
    label: string;
};

