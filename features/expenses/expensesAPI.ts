export type ExpensesResponse = {
    tanggal: string
    jam: string
    nama: string
    pengeluaraan: number
}

export const expensesAPI = () => {
    return new Promise<ExpensesResponse[]>((resolve, reject) => {
        import('utils/json/json-test-fe.json')
            .then(jsonData => {
                if (jsonData.detail) {
                    resolve(jsonData.detail)
                } else {
                    reject('missing detail')
                }
            })
            .catch(reject)
    })
}