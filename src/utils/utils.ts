import { Languages } from "./types";

export function parseLanguage(language: string): Languages{
    if (language.toLowerCase() === 'it'){
        return Languages.IT
    } else{
        return Languages.EN
    }
}

export function parseFrontmatter<T extends Record<string, any>>(frontmatter: T, language: Languages): T {
        let a = copyRecord({}, frontmatter, language)
        //console.log("obj:", JSON.stringify(a), "\n\nrecord:", JSON.stringify(frontmatter))
        return a

}

export function copyRecord<T extends Record<string, any>>(obj: any, record: T, language: Languages): T {
    const props = Object.keys(record);
    for (let i = 0; i < props.length; i++) {
        const field = props[i];
        if(typeof record[field] === 'object' && !Array.isArray(record[field])){
            //console.log(1, " ", field, ": ", record[field]);
            obj[field] = copyRecord({}, record[field], language)
        }
        else if(Array.isArray(record[field])){
            //console.log(2, " ", field, ": ", record[field]);
            if(record[field].length > 0){
                const propsL2 = Object.keys(record[field][0]);
                if(propsL2.includes("lang")){
                    record[field].map((el: any) => {
                        if (el.lang === language) {
                            obj[field] = {}
                            for (let e = 0; e < propsL2.length; e++) {
                                obj[field][propsL2[e]] = el[propsL2[e]]
                            }
                        }
                    } )
                } else {
                    obj[field] = record[field].map((element: any) => {
                        return copyRecord({}, element, language)})
                } 
            }
        } else {
            //console.log(3, " ", field, ": ", record[field]);
            obj[field] = record[field];
        }
    }
    return obj
}

