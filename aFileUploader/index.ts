import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class aFileUploader
  implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  constructor() {}
  private FileContainer: HTMLDivElement;
  private theContext: ComponentFramework.Context<IInputs>;
  private theContainter: HTMLDivElement;
  private theNotifyOutputChanged: () => void;
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ) {
    console.log("inside init");
    this.theContext = context;
    this.theNotifyOutputChanged = notifyOutputChanged;
    this.theContainter = container;
    let localContainer: HTMLDivElement = document.createElement("div");
    localContainer.appendChild(this.CreateControlWindow());
    container.appendChild(this.theContainter.appendChild(localContainer));
  }

  public updateView(context: ComponentFramework.Context<IInputs>): void {
    console.log("inside updateView");
    const tempUploadinput: HTMLInputElement = document.createElement("input");
    tempUploadinput.setAttribute("type", "file");
    tempUploadinput.setAttribute("multiple", "multiple");
    this.theContainter.appendChild(tempUploadinput);
  }

  public getOutputs(): IOutputs {
    console.log("inside getOutputs");
    return {};
  }

  public destroy(): void {
    console.log("inside destroy");
  }

  //#region
  private CreateControlWindow(): HTMLDivElement {
    let controllWindow: HTMLDivElement;
    controllWindow = document.createElement("div");
    controllWindow.className = "controllWindow";
    let leftContainer: HTMLDivElement = this.createDiv("LeftContainer");
    leftContainer.appendChild(this.createInputSection());
    let rightContainer: HTMLDivElement = this.createDiv("RightContainer");
    rightContainer.appendChild(this.crbuttonDiv());
    rightContainer.appendChild(this.crtDragZone());
    controllWindow.appendChild(leftContainer);
    controllWindow.appendChild(rightContainer);
    return controllWindow;
  }

  private createDiv(
    divid: string,
    classname = "",
    childElements?: HTMLElement[]
  ): HTMLDivElement {
    let _div: HTMLDivElement = document.createElement("div");
    _div.id = divid;
    classname ? (_div.className = classname) : "";
    if (childElements != null && childElements?.length > 0) {
      childElements.forEach((child) => {
        _div.appendChild(child);
      });
    }

    // return crLableNInput();
    return _div;
  }

  private createInputSection() {
    let InputSection: HTMLDivElement = document.createElement("div");
    InputSection.className = "inputsection";
    const lblTitle = this.createLable("Title", "labels", "inpTitle");
    const inpTitle = this.createInput("Title", "form-control");
    inpTitle.placeholder = "Please enter Title for Attachment(s)...";
    const titleDiv: HTMLDivElement = this.createDiv("titlediv", "form-group", [
      lblTitle,
      inpTitle,
    ]);
    const lblNotes = this.createLable("Notes", "labels", "inpnotes");
    const inpnotes = this.crtTextArea("Notes", "form-control");
    inpnotes.placeholder = "Please enter Notes for Attachment(s)...";
    const notesDiv: HTMLDivElement = this.createDiv("notesDiv", "form-group", [
      lblNotes,
      inpnotes,
    ]);
    InputSection.appendChild(titleDiv);
    InputSection.appendChild(notesDiv);
    return InputSection;
  }

  private createLable(
    labelname: string,
    classname: string,
    forId: string
  ): HTMLLabelElement {
    let _label: HTMLLabelElement = document.createElement("label");
    //_label = document.createElement("lable");
    _label.innerHTML = labelname;
    _label.id = `lbl${labelname}`;
    _label.className = classname;
    _label.setAttribute("for", forId);
    return _label;
  }

  private createInput(inpid: string, classname: string = ""): HTMLInputElement {
    let _input: HTMLInputElement = document.createElement("input");
    _input.id = `inp${inpid}`;
    classname ? (_input.className = classname) : null;
    return _input;
  }
  private crtTextArea(
    inpid: string,
    classname: string = ""
  ): HTMLTextAreaElement {
    let _input: HTMLTextAreaElement = document.createElement("textarea");
    _input.id = `inp${inpid}`;
    classname ? (_input.className = classname) : null;
    return _input;
  }

  private createButton(
    buttontext: string,
    buttonid: string,
    classname: string
  ): HTMLButtonElement {
    let _button: HTMLButtonElement = document.createElement("button");
    _button.id = buttonid;
    _button.innerHTML = buttontext;
    _button.className = classname;
    return _button;
  }

  private crbuttonDiv(): HTMLDivElement {
    let submitButton = this.createButton("Submit", "btnsubmit", "actionButton");
    let cancelButton = this.createButton("Cancel", "btncancel", "actionButton");
    let uploadInput = this.createInput("uploadButton");
    uploadInput.type = "file";
    uploadInput.setAttribute("data-fillr-id", "66644");
    uploadInput.setAttribute("multiple", "multiple");

    let browsebuttonDiv = this.createDiv("divBrowse", "actionButton browse");
    browsebuttonDiv.innerHTML = "BROWSE";
    let browseDiv = this.createDiv("browsediv", "upload", [
      browsebuttonDiv,
      uploadInput,
    ]);
    let buttonsDiv = this.createDiv("buttonid", "buttonsdiv", [
      browseDiv,
      submitButton,
      cancelButton,
    ]);
    return buttonsDiv;
  }

  private crtDragZone(): HTMLDivElement {
    let _dragZone: HTMLDivElement;
    let _dropzone: HTMLDivElement;
    let _filecontainer: HTMLDivElement;
    let _divWatermark: HTMLDivElement = this.createDiv(
      "_divWatermark",
      "waterMark"
    );
    _divWatermark.innerHTML = "Drag and Drop your files";
    let _files: HTMLDivElement = this.createDiv("_files");
    _dragZone = this.createDiv("dragzone", "dragzone", [_divWatermark, _files]);
    _dragZone.setAttribute("draggable", "true");
    _dragZone.setAttribute("ondragstart", "drag(event)");
    _dragZone.style.minHeight = "150px";

    _dropzone = this.createDiv("dropzone", "dropzone", [_dragZone]);
    _dropzone.setAttribute("ondragover", "allowDrop(event)");
    _dropzone.setAttribute("ondrop", "drop(event)");
    _filecontainer = this.createDiv("filecontainer", "filecontainer", [
      _dropzone,
    ]);
    return _filecontainer;
  }

  private drag(e: DragEvent): void {
    // console.log(e.dataTransfer.setData("text", (e.target as HTMLElement).id));
    console.log("drag");
  }
  private allowDrop(ev: any) {
    ev.preventDefault();
    console.log("allow drop");
  }
  private drop(ev: any) {
    ev.preventDefault();
    console.log("drop");

    // var data = ev.dataTransfer.getData("text");
    // addFiles(ev.dataTransfer.files);
  }
  //#endregion
}
