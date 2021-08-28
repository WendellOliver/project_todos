import * as Yup from "yup";
import { TransformFunction } from 'yup/lib/types';
import { parse, isDate } from 'date-fns';

function parseDateString(
    value: any,
    originalValue: any,
): TransformFunction<Yup.DateSchema> {
    const parsedDate = isDate(originalValue)
        ? originalValue
        : parse(originalValue, 'yyyy-MM-dd', new Date());

    return parsedDate;
}

const requestSchema = Yup.object({

    name: Yup.string().required(),
    email:Yup.string().required().email(),
    cpf:Yup.string().required().length(11),
    birthDate:Yup.date().transform(parseDateString).required()

});

export default requestSchema;
