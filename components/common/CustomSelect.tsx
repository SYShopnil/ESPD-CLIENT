import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import ErrorMessage from './ErrorMessage';

const CustomSelect = (name, options, placeholderText, requiredMessage) => {

    const { handleSubmit, control, formState: { errors } } = useForm();
    /*{
        resolver: yupResolver(formSchema)
    }*/

    return (
        <>
            <Controller
                name="subject_level"
                control={control}
                rules={{ required: name }}
                render={({ field }) => (
                    <Select
                        classNamePrefix="espd-select"
                        isSearchable
                        options={options}
                        {...field}
                        isClearable
                        placeholder={placeholderText}
                    />
                )}

            />
            {
                errors.subject_level
                &&
                <ErrorMessage text={`${errors}.?${name}?.message`} />

            }


        </>
    );
};

export default CustomSelect;