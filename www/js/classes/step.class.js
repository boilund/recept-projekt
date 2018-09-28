class Step extends Base{
    constructor(context, parent){
        super();
        this.context=context;
        this.parent=parent;
    }

    click(event){
        let that = this;
        let target = $(event.target);
        if (target.hasClass("delete-step")) {
            that.parent.deleteStep(that);
          }
    }

    export(){
        return this.context;
    }
}