'use strict'
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
// const Map = user('Map')

Route.on('/').render('welcome');

Route.get('provincial', 'ProvincialController.index');
Route.get('provincial/:id', 'ProvincialController.show');
Route.post('provincial', 'ProvincialController.store').validator('Provincial');
Route.put('provincial/:id', 'ProvincialController.update').validator('Provincial');
Route.delete('provincial/:id', 'ProvincialController.destroy');
/**
 * Auth
 */
Route.group(() => {
    Route.post('login', 'AuthController.login')
        .middleware('guest');

    Route.post('me', 'AuthController.me').middleware('auth')
    Route.post('refresh-token', 'AuthController.getNewToken')
}).prefix('auth')

//=======================================================
/**
 * User Route
 */
Route.resource('users', 'UserController')
    .validator(new Map([
        [['users.store'], ['StoreUser']],
        [['users.update'], ['UpdateUser']]
    ]))
    .middleware('auth')

Route.patch('users/:id/add-permissions', 'UserController.addPermissions')
    .validator('UpdateUser')
    .middleware('auth')
Route.patch('users/:id/add-roles', 'UserController.addRoles')
    .validator('UpdateUser')
    .middleware('auth')

Route.patch('users/:id/update-permissions', 'UserController.updatePermissions')
    .validator('UpdateUser')
    .middleware('auth')
Route.patch('users/:id/update-roles', 'UserController.updateRoles')
    .validator('UpdateUser')
    .middleware('auth')

//========================================================

//=======================================================
/**
 * District Route
 */
Route.get('district', 'DistrictController.index');
Route.get('district/:id', 'DistrictController.show');
Route.post('district', 'DistrictController.store').validator('StoreDistrict');
Route.put('district/:id', 'DistrictController.update').validator('StoreDistrict');
Route.delete('district/:id', 'DistrictController.destroy');
//========================================================

/**
 * Role Route
 */
Route.resource('roles', 'RoleController')
    .validator(new Map([
        [['roles.store'], ['StoreRole']],
        [['roles.update'], ['UpdateRole']]
    ]))
    .middleware('auth')
Route.patch('roles/:id/add-permissions', 'RoleController.addPermissions')
    .validator('UpdateRole')
    .middleware('auth')
//========================================================

/**
 * Permission Route
 */
Route.resource('permissions', 'PermissionController')
    .validator(new Map([
        [['permissions.store'], ['StorePermission']],
        [['permissions.update'], ['UpdatePermission']]
    ]))
    .middleware('auth')

//=======================================================
/**
 * School Route
 */
Route.get('school', 'SchoolController.index');
Route.get('school/:id', 'SchoolController.show');
Route.post('school', 'SchoolController.store').validator('StoreSchool');
Route.put('school/:id', 'SchoolController.update').validator('StoreSchool');
Route.delete('school/:id', 'SchoolController.destroy');
//========================================================

//========================================================
/**
 * TopicController
 */
Route.get('topic', 'TopicController.index');
Route.get('topic/:id', 'TopicController.show');
Route.post('topic', 'TopicController.store').validator('StoreTopic');
Route.put('topic/:id', 'TopicController.update').validator('StoreTopic');
Route.delete('topic/:id', 'TopicController.destroy');
//========================================================

//========================================================
/**
 * PostController
 */
Route.get('post', 'PostController.index');
Route.get('post/:id', 'PostController.show');
Route.post('post', 'PostController.store').validator('StorePost');
Route.put('post/:id', 'PostController.update').validator('UpdatePost');
Route.delete('post/:id', 'PostController.destroy');
//========================================================
Route.post('upload-file', 'UploadFileController.upload');



