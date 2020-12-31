<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\CourseController as APICourseController;
use App\Http\Controllers\API\LecturerController as APILecturerController;
use App\Http\Controllers\API\EnrolmentController as APIEnrolmentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::middleware('api')->group(function () {
  // Route::get('/books', [APIBookController::class, 'index']);

    Route::resource('courses', APICourseController::class)->except([
        'create', 'edit'
    ]);
    Route::resource('lecturers', APILecturerController::class)->except([
        'create', 'edit'
    ]);
    Route::resource('enrolments', APIEnrolmentController::class)->except([
        'create', 'edit'
    ]);
});
