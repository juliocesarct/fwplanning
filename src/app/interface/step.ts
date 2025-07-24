import { TemplateRef } from "@angular/core";
import { PoRadioGroupOption, PoStepperStatus } from "@po-ui/ng-components";

export interface Step {
    /** Identificador único do step. */
    id?: string;
    /** Define o ícone do *step* ativo. */
    values: string[];

    options: PoRadioGroupOption[];

    iconActive?: string | TemplateRef<void>;
    /** Define o ícone do *step* concluído. */
    iconDone?: string | TemplateRef<void>;
    /** Define o ícone do *step* default. */
    iconDefault?: string | TemplateRef<void>;
    /** Texto do item do stepper. */
    label?: string;
    /** Define o estado de exibição do *step*. */
    status?: PoStepperStatus;

    answer: number;
}
