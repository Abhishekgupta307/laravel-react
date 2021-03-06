<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Providers\RouteServiceProvider;
use Auth;

class UserController extends Controller
{
    private $status_code    =        200;
    public function userSignUp(Request $request)
    {
        $validator              =        Validator::make($request->all(), [
            "name"              =>          "required",
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            "password"          =>          'required', 'min:6',
            "phone"             =>          'required', 'number', 'min:10'
        ]);

        if ($validator->fails()) {
            return response()->json(["status" => "failed", "message" => "Validation error", "errors" => $validator->errors()]);
        }

        $name                   =       $request->name;
        $name                   =       explode(" ", $name);
        $first_name             =       $name[0];
        $last_name              =       "";

        if (isset($name[1])) {
            $last_name          =       $name[1];
        }

        $userDataArray          =       array(
            "first_name"         =>          $first_name,
            "last_name"          =>          $last_name,
            "full_name"          =>          $request->name,
            "email"              =>          $request->email,
            "password"           =>          Hash::make($request->password),
            "phone"              =>          $request->phone
        );

        $user_status            =           User::where("email", $request->email)->first();
        if (!is_null($user_status)) {
            return response()->json(["status" => "Whoops! email already registered", "success" => false, "message" => "Whoops! email already registered"]);
        }

        $user                   =           User::create($userDataArray);
        $token = $user->createToken('Laravel Password Grant Client')->accessToken;
        //$token = $user->createToken($user->email . '-' . now());

        if (!is_null($user)) {
            return response()->json(["token" => $token, "status" => $this->status_code, "success" => true, "message" => "Registration completed successfully", "data" => $user]);
        } else {
            return response()->json(["status" => "failed", "success" => false, "message" => "failed to register"]);
        }
    }

    // ------------ [ User Login ] -------------------
    public function userLogin(Request $request)
    {

        $validator          =       Validator::make(
            $request->all(),
            [
                "email"             =>          "required|email",
                "password"          =>          "required"
            ]
        );

        if ($validator->fails()) {
            return response()->json(["status" => "failed", "validation_error" => $validator->errors()]);
        }
        // check if entered email exists in db
        $email_status       =       User::where("email", $request->email)->first();
        // if email exists then we will check password for the same email
        $password_status    =   User::where("email", $request->email)->where("password", Hash::make($request->password))->first();
        // if password is correct
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user           =       $this->userDetail($request->email);
            $token = $user->createToken('Laravel Password Grant Client')->accessToken;
            //$token = $user->createToken($user->email . '-' . now());

            return response()->json(["token" => $token, "status" => $this->status_code, "success" => true, "message" => "You have logged in successfully", "data" => $user]);
        } else {
            return response()->json(["status" => "failed", "success" => false, "message" => "Unable to login. Incorrect password."]);
        }
    }

    // ------------------ [ User Detail ] ---------------------
    public function userDetail($email)
    {
        $user               =       array();
        if ($email != "") {
            $user           =       User::where("email", $email)->first();
            return $user;
        }
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
