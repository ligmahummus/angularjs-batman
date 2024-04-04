angular.module('TodoApp', [])
    .controller('AppCtrl', function ($scope) {
        $scope.title = 'Todo App'
        $scope.links = [
            { text: 'Github', href: 'https://github.com/xarielah' },
        ]

        const c = this;

        $scope.state_values = [
            { label: 'In progress', value: "In progress" },
            { label: 'Done', value: "Done" },
            { label: 'Pending', value: "Pending" }
        ]

        const newTaskInit = {
            text: "",
            state: "In progress",
            description: "",
            by: "",
        }
        c.newTask = newTaskInit

        c.tasks = [
            { id: uuid(), text: 'Learn AngularJS', state: 'In progress', description: "lorem ipsum dolor emmet", by: "Ariel", edit: null },
            { id: uuid(), text: 'Build an app', state: 'In progress', description: "lorem ipsum dolor emmet", by: "Ariel", edit: null },
            { id: uuid(), text: 'Deploy to cloud', state: 'In progress', description: "lorem ipsum dolor emmet", by: "Ariel", edit: null },
            { id: uuid(), text: 'Run the app', state: 'In progress', description: "lorem ipsum dolor emmet", by: "Ariel", edit: null }
        ]

        c.openDialog = false;

        c.toggleDialog = function () {
            c.openDialog = !c.openDialog;
        }

        c.taskDialogErrors = {}

        c.addTask = function (task) {
            const fields = Object.keys(task);

            for (let i = 0; i < fields.length; i++) {
                const field = fields[i];
                if (!task[field]) {
                    c.taskDialogErrors[field] = `${field} is required`;
                } else {
                    delete c.taskDialogErrors[field]
                }
            }

            const errorList = Object.keys(c.taskDialogErrors);
            if (errorList.length > 0) return
            else {
                task.id = uuid()
                task.edit = null
                c.tasks.push(task)
                c.toggleDialog()
                $scope.newTask = newTaskInit
            }
        }


        function uuid() {
            return Math.random().toString(16).slice(2)
        }
    })
