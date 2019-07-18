"use strict"

let show_register = document.querySelector('.btn_register_now')
let show_sign_in = document.querySelector('.btn_sign_in')

let send_register_data = document.querySelector('.send_register_data')
let send_sign_in_data = document.querySelector('.send_sign_in_data')

let window_register = document.querySelector('.register')
let window_post = document.querySelector('.post')
let window_sign_in = document.querySelector('.sign_in')

let btn_log_out = document.querySelector('.link_log_out')

// login regular expression
let reg_expression = /^[a-zA-Z0-9]+$/
// login regular expression end

// inputs
let input_register_register_login = document.querySelector('#register_login')
let input_register_password = document.querySelector('#register_password')
let input_register_password_confirm = document.querySelector('#register_password_confirm')

let input_post_title = document.querySelector('#post_title')
let input_post_body = document.querySelector('#post_body')

let sign_in_login = document.querySelector('#sign_in_login')
let sign_in_password = document.querySelector('#sign_in_password')

let inputs_register = document.querySelectorAll('.register.form_window_popup input')
let inputs_post = document.querySelectorAll('.post.form_window_popup input')
let inputs_sign_in = document.querySelectorAll('.sign_in.form_window_popup input')
// inputs end

// another variables
let body = document.querySelector('body')
let text_error = document.createElement('p')
let error_div = document.createElement('div')
// another variables end



/*
    MINE FUNCTIONS
*/

    function showErrorMessage(item) {
        // let tagH2 = document.querySelector(item + ' h2')
        // let hello = 'ABCD'
        // insertAfter(hello, tagH2)
    }

    // show success status
    function showSuccess() {
        let block = document.querySelector('.success_sended')

        block.classList.add('success_sended_active')

        setTimeout(() => {
            block.classList.remove('success_sended_active')
        }, 1450)
    }
    // show success status end

    // redirect after authentification
    function redirectPage(timer, page) {
        if(timer) {
            setTimeout(() => {
                window.location.href = page
            }, timer)
        } else {
            window.location.href = page
        }
    }
    // redirect after authentification end

/*
    MINE FUNCTIONS END
*/



/*
	SEND DATA BY CLICKING BUTTON
*/

    if(document.querySelector('nav.navbar').getAttribute('user') === 'false') {
        // register now
        send_register_data.onclick = (e) => {
            
            e.preventDefault()
            
            let register_data = {
                register_login: document.querySelector('#register_login').value,
                register_address: document.querySelector('#register_address').value,
                register_password: document.querySelector('#register_password').value,
                register_password_confirm: document.querySelector('#register_password_confirm').value
            }
            
            $.ajax({
                type: 'POST',
                data: JSON.stringify(register_data),
                contentType: 'application/json',
                url: '/api/auth/register'
            }).done((register_data) => {
                if(!register_data.ok) {
                    showErrorMessage('.register')
                    
                    // add content to 'p'
                    text_error.innerHTML = register_data.message
    
                    // error fields animation
                    register_data.fields.forEach(function(item) {
                        $('input[name=' + item + ']').addClass('error_input')
                    })
                } else {
                    // all is okey function		
                    // btn animations success && green
                    send_register_data.style.backgroundColor = '#28A745'
                    error_div.style.display = 'none'
    
                    returnWindowsStatus()
                    showSuccess()
                    redirectPage(2000, '/')
                }
                console.log(register_data.message)
            })
    
            deleteInputContent()
        }
        // register now end

        // sign in
        send_sign_in_data.onclick = (e) => {
            
            e.preventDefault()
            
            let sign_in_data = {
                sign_in_login: document.querySelector('#sign_in_login').value,
                sign_in_password: document.querySelector('#sign_in_password').value
            }

            console.log(sign_in_data)
            
            $.ajax({
                type: 'POST',
                data: JSON.stringify(sign_in_data),
                contentType: 'application/json',
                url: '/api/auth/login'
            }).done((sign_in_data) => {
                if(!sign_in_data.ok) {
                    showErrorMessage('.sign_in')
                    
                    // add content to 'p'
                    text_error.innerHTML = sign_in_data.message

                    // error fields animation
                    sign_in_data.fields.forEach(function(item) {
                        $('input[name=' + item + ']').addClass('error_input')
                    })

                } else {
                    // all is okey function		
                    // btn animations success && green
                    send_sign_in_data.style.backgroundColor = '#28A745'
                    error_div.style.display = 'none'

                    returnWindowsStatus()
                    showSuccess()
                    redirectPage(2000, '/')

                }
                console.log(sign_in_data.message)
            })
            
            deleteInputContent()
        }
        // sign in end

        // reg exspression
        input_register_register_login.oninput = () => {
            if(document.querySelector('.user_false')) {
                if(!reg_expression.test(input_register_register_login.value)) {
                    input_register_register_login.value = ''
                }
                
                console.log(reg_expression.test(input_register_register_login.value))
            }
        }
        // reg exspression end

        // register window oninput
        input_register_password.oninput = () => {
            if(document.querySelector('.user_false')) {
                if(input_register_password.value.length > 5) {
                    input_register_password_confirm.removeAttribute('disabled')
                } else {
                    input_register_password_confirm.setAttribute('disabled', 'disabled')
                    input_register_password_confirm.value = ''
                }
            }
        }
        // register window oninput end
    }



/*
	SEND DATA BY CLICKING BUTTON END
*/


/*
    IF USER IS FALSE
*/

    // windows opening animation
    function showFormWindow (link, item) {
        if(document.querySelector('.user_false')) {
            document.querySelector('.btn_open_window' + link).onclick = () => {
                document.querySelector('.form_window_popup' + link).classList.add('form_window_popup_active_step')
                setTimeout(() => { 
                    document.querySelector('.form_window_popup' + link).classList.add('form_window_popup_active_step_2')
                }, 100)
        
                document.querySelector('.form_window_popup' + item).classList.remove('form_window_popup_active_step_2')
                setTimeout(() => {
                    document.querySelector('.form_window_popup' + item).classList.remove('form_window_popup_active_step')
                }, 300)
                
                deleteInputContent()
            }
        }
    }
    // windows opening animation end

    // delete all inputs content
    function deleteInputContent() {
        if(document.querySelector('.user_false')) {
            let all_input = document.querySelectorAll('.form_windows input')
            
            for(let item of all_input) {
                item.value = ''
            }
        }
    }
    // delete all inputs content end

    // for animate showing form windows
    function returnWindowsStatus() {
        if(document.querySelector('.user_false')) {
            let all_windows = document.querySelectorAll('.form_window_popup')
            let all_windows_btns = document.querySelectorAll('.btn_send_data')

            for(let item of all_windows) {
                item.classList.remove('form_window_popup_active_step_2')
                setTimeout(() => {
                    item.classList.remove('form_window_popup_active_step')
                }, 300)
            }
            for(let item_btn of all_windows_btns) {
                item_btn.style.backgroundColor = '#007BFF'
            }
        }
    }
    // for animate showing form windows end

    // register password & co-password animations
    if(document.querySelector('.user_false')) {
        input_register_password_confirm.setAttribute('disabled', 'disabled')
    }
    // register_password animations end

/*
    IF USER IS FALSE END
*/



/*
	CALL FUNCTIONS
*/

    showFormWindow('.link_sign_in', '.link_register')
    showFormWindow('.link_register', '.link_sign_in')

/*
    CALL FUNCTIONS END
*/



/*
	POST ARTICLE
*/

    if(body.getAttribute('page') == "create") {
        let form = document.querySelector('#form_create_post')

        form.onsubmit = (e) => {
            // WE TRY SEND AJAX REQ FUCKING 2 TIMES FOR UPLOADING IMAGE AND TEXT :)
            e.preventDefault()

            // UPLOAD IMAGE
            var formData = new FormData(document.querySelector('#form_create_post'))

            $.ajax({
                type: 'POST',
                url: '/create',
                data: formData,
                processData: false,
                contentType: false,
                success: function(r) {
                  console.log(r);
                },
                error: function(e) {
                  console.log(e);
                }
            })

            console.log(formData)

            // UPLOAD TEXT
            let text_data = {
                post_title: document.querySelector('#post_title').value,
                post_body: document.querySelector('#post_body').value,
                post_draft: document.querySelector('#post_draft').checked
            }

            $.ajax({
                type: 'POST',
                data: JSON.stringify(text_data),
                contentType: 'application/json',
                url: '/create'
            })

            showSuccess()
            redirectPage(2000, '/')
            
            console.log(text_data)
        }
    }

/*
	POST ARTICLE END
*/

/*
	EDIT ARTICLE
*/
    if(body.getAttribute('page') == "edit") {
        
        // ATTEMPT 2
        let form = document.querySelector('#form_edit_post')
        let newImage = document.querySelector('#newImage')
        let isItNewImage = false

        newImage.onchange = () => {
            isItNewImage = true
        }


        form.onsubmit = (e) => {
            e.preventDefault()


            // UPLOAD IMAGE
            // if new image choosed
            if(isItNewImage) {
                var formData = new FormData(document.querySelector('#form_edit_post'))

                $.ajax({
                    type: 'POST',
                    url: '/create/edit',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(r) {
                      console.log(r);
                    },
                    error: function(e) {
                      console.log(e);
                    }
                })

                console.log('IMAGE WAS SENDED BY AJAX')
            } else if(!isItNewImage) {
                console.log('THATS OLD IMAGE')
            } else {
                alert('ERROR')
            }



            // UPLOAD TEXT
            let text_data = {
                post_title: document.querySelector('#post_title').value,
                post_body: document.querySelector('#post_body').value,
                post_id: document.querySelector('.post_edit.container').getAttribute('data-id'),
                isItNewImage: isItNewImage
            }

            $.ajax({
                type: 'POST',
                data: JSON.stringify(text_data),
                contentType: 'application/json',
                url: '/create/edit'
            })

            // showSuccess()
            // redirectPage(2000, '/')
            
            console.log(text_data)
        }
    }
/*
	EDIT ARTICLE END
*/



/*
    REMOVE TO DICKS
*/
    if(body.getAttribute('page') == "home") {
        let btn_remove = document.querySelectorAll('.remove_to_dicks')

        for(let item of btn_remove) {
            item.onclick = (e) => {
                e.preventDefault()

                let data = {
                    post_id: item.parentNode.parentNode.parentNode.getAttribute('id')
                }

                $.ajax({
                    type: 'POST',
                    data: JSON.stringify(data),
                    contentType: 'application/json',
                    url: '/post/delete'
                }).done((data) => {
                    if(data.ok) {
                        showSuccess()
                        redirectPage(0, '/')
                    } else {
                        alert('ERROR ON CLIENT SIDE')
                    }
                })
            }
        }
    }
/*
    REMOVE TO DICKS END
*/



/*
    DRAFT BUTTONS
*/
    if(body.getAttribute('page') == "my_drafts") {
        let draft_to_dicks = document.querySelectorAll('.draft_to_dicks')
        let draft_to_post = document.querySelectorAll('.draft_to_post')

        for(let item of draft_to_dicks) {
            let draft_id = item.parentNode.parentNode.parentNode.parentNode.getAttribute('id')
            item.onclick = (e) => {
                e.preventDefault()

                let draft_data = {
                    id: draft_id
                }

                $.ajax({
                    type: 'POST',
                    data: JSON.stringify(draft_data),
                    contentType: 'application/json',
                    url: '/post/delete_draft'
                }).done((draft_data) => {
                    if(!draft_data.ok) {
                        alert('FUCKED')
                    } else {
                        location.reload(true)
                        console.log('Page highly reloaded')
                    }
                })
            }
        }
        for(let item of draft_to_post) {
            let draft_id = item.parentNode.parentNode.parentNode.parentNode.getAttribute('id')
            item.onclick = (e) => {
                e.preventDefault()

                let draft_data = {
                    id: draft_id
                }

                $.ajax({
                    type: 'POST',
                    data: JSON.stringify(draft_data),
                    contentType: 'application/json',
                    url: '/post/draft_to_post'
                }).done((draft_data) => {
                    if(!draft_data.ok) {
                        alert('FUCKED')
                    } else {
                        location.reload(true)
                        console.log('Page highly reloaded')
                    }
                })
            }
        }
    }
/*
    DRAFT BUTTONS END
*/