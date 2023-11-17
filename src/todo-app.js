angular.module('TodoApp', [])
    .controller('AppCtrl', function ($scope) {
        $scope.title = 'Todo App'
        $scope.links = [
            { text: 'Github', href: 'https://github.com/ligmahummus' },
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

        $scope.test = function (field) {
            for (let i = 0; i < c.tasks.length; i++) {
                if (c.tasks[i].edit === field) {
                    c.tasks[i].edit = null;

                    // Make it rerender
                    $scope.$digest()

                    // Break the loop
                    break;
                }
            }
        }



        function uuid() {
            return Math.random().toString(16).slice(2)
        }
    })
    .directive('okButton', function () {
        function link(scope, element, attrs) {
            element.bind('click', function () {
                const allowedFields = ['state', 'by', 'description', 'text']
                const field = attrs.field;
                if (allowedFields.indexOf(field) === -1) return

                // Trigger parent scope field update
                scope.test(attrs.field)
            })
        }

        return {
            link: link,
            restrict: 'E',
            template: '<button class="ok-btn">OK</button>'
        }
    })