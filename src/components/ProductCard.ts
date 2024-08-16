import { createElement } from "../utils/utils";
import { IEvents } from "./base/events";

export class ProductCard {
    protected element: HTMLElement;
    protected events: IEvents;
    protected cardCategory: HTMLElement;
    protected cardTitle: HTMLElement;
    protected cardImage: HTMLImageElement;
    protected cardPrice: HTMLElement;
    protected description: HTMLElement;

    constructor(template: HTMLTemplateElement, events: IEvents) {
        this.events = events;
        this.element = createElement(template)
    }

}