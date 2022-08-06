import React, { useState } from 'react'
import Button from 'components/forms/Button'
import Input from 'components/forms/Input'
import ModalContainer, { ModalContainerProps } from './ModalContainer'
import { addExpenses } from 'features/expenses/expensesSlice'
import { useAppDispatch } from 'lib/hooks'
import { inputNumber } from 'utils/helper'
import { IValidationErrors, validateData, validateOne } from 'utils/validation'

const TambahEntriModal = (props: Partial<ModalContainerProps>) => {
    const dispatch = useAppDispatch()

    const [state, setState] = useState({
        nama: '',
        harga: '',
    })

    const [error, setError] = useState<IValidationErrors>({})

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const isNumber = name === 'harga'
        const value = isNumber ? inputNumber(e.target.value) : e.target.value

        setState(prev => ({
            ...prev,
            [name]: value,
        }))

        const { errors, isValid } = validateOne(name, value, rules)

        setError(prev => ({
            ...prev,
            [name]: isValid ? '' : errors[name]
        }))
    }

    const handleSave = () => {
        const { errors, isValid } = validateData(state, rules)

        setError(errors)

        if (isValid) {
            const currentDate = new Date()
            const hour = currentDate.getHours()
            const minutes = currentDate.getMinutes()

            dispatch(addExpenses({
                tanggal: currentDate.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),
                jam: `${hour > 9 ? hour : `0${hour}`}:${minutes > 9 ? minutes : `0${minutes}`}`,
                nama: state.nama,
                pengeluaraan: Number(state.harga),
            }))

            setState({
                harga: '',
                nama: '',
            })

            props.onClose()
        }
    }

    return (
        <ModalContainer
            isOpen={props.isOpen}
            onClose={props.onClose}
        >
            <div className="bg-white px-4 py-2.5 min-w-[320px]" onClick={e => e.stopPropagation()}>
                <h2 className="text-xl font-medium mb-4">
                    Tambah Entri
                </h2>
                <Input
                    value={state.nama}
                    label="Nama"
                    name="nama"
                    onChange={onChange}
                    error={error.nama}
                    ContainerProps={{
                        className: 'mb-3',
                    }}
                />
                <Input
                    value={state.harga}
                    label="Harga"
                    name="harga"
                    onChange={onChange}
                    error={error.harga}
                    ContainerProps={{
                        className: 'mb-5',
                    }}
                />
                <div className="flex items-center justify-end w-full">
                    <Button color='secondary' onClick={props.onClose}>
                        BATAL
                    </Button>
                    <Button className='ml-2' onClick={handleSave}>
                        KIRIM
                    </Button>
                </div>
            </div>
        </ModalContainer>
    )
}

const rules = {
    nama: 'required',
    harga: 'required',
}

export default TambahEntriModal
