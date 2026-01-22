import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

/* -------- AUTH SCREENS -------- */
import AuthLoading from "./pages/Auth/AuthLoading";
import AuthScreen from "./pages/Auth/AuthScreen";
import ForgotPassword from "./pages/Auth/ForgotPassword";

/* -------- MAIN SCREENS -------- */
import Home from "./pages/Homepage/Home";
import TopRatedList from "./pages/TopRatedList";
import Charity from "./pages/Charity/Charity";
import Profile from "./pages/Profile/Profile";
import Feedback from "./pages/Feedback/Feedback";

import School1 from "./pages/School/School1";
import School2 from "./pages/School/School2";

import College0 from "./pages/College/College0";
import College1 from "./pages/College/College1";
import College2 from "./pages/College/College2";
import College3 from "./pages/College/College3";
import College4 from "./pages/College/College4";

import Course1 from "./pages/Course/Course1";
import Course2 from "./pages/Course/Course2";
import Course3 from "./pages/Course/Course3";
import Course4 from "./pages/Course/Course4";

import Exam1 from "./pages/Exam/Exam1";
import Exam2 from "./pages/Exam/Exam2";
import Exam3 from "./pages/Exam/Exam3";

import Iq1 from "./pages/IqTest/Iq1";
import Iq2 from "./pages/IqTest/Iq2";
import Iq3 from "./pages/IqTest/Iq3";
import IqResult from "./pages/IqTest/IqResult";


import Extraskills1 from "./pages/Extraskills/Extraskills1";
import Extraskills2 from "./pages/Extraskills/Extraskills2";
import Extraskills3 from "./pages/Extraskills/Extraskills3";
import Extraskills4 from "./pages/Extraskills/Extraskills4";

import Tution1 from "./pages/Tutions/Tutions1";
import Tution2 from "./pages/Tutions/Tutions2";
import Tution3 from "./pages/Tutions/Tutions3";


import BlogsScreen from "./pages/Blogs/BlogsScreen";
import BlogDetailScreen from "./pages/Blogs/BlogDetailScreen";

import Collegecourse1 from "./pages/Collegecourse.js/Collegecourse1";
import Collegecourse2 from "./pages/Collegecourse.js/Collegecourse2";
import Collegecourse3 from "./pages/Collegecourse.js/Collegecourse3";
import Collegecourse4 from "./pages/Collegecourse.js/Collegecourse4";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* 🔐 AUTO LOGIN CHECK */}
        <Stack.Screen name="AuthLoading" component={AuthLoading} />

        {/* ---------- AUTH FLOW ---------- */}
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

        {/* ---------- MAIN APP ---------- */}
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="TopRatedList" component={TopRatedList} />
        <Stack.Screen name="Charity" component={Charity} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Feedback" component={Feedback} />

        <Stack.Screen name="School1" component={School1} />
        <Stack.Screen name="School2" component={School2} />

      
        
                <Stack.Screen name="College0" component={College0} />

        <Stack.Screen name="College1" component={College1} />
        <Stack.Screen name="College2" component={College2} />
        <Stack.Screen name="College3" component={College3} />
        <Stack.Screen name="College4" component={College4} />

        <Stack.Screen name="Course1" component={Course1} />
        <Stack.Screen name="Course2" component={Course2} />
        <Stack.Screen name="Course3" component={Course3} />
        <Stack.Screen name="Course4" component={Course4} />

        <Stack.Screen name="Exam1" component={Exam1} />
        <Stack.Screen name="Exam2" component={Exam2} />
        <Stack.Screen name="Exam3" component={Exam3} />

        <Stack.Screen name="Iq1" component={Iq1} />
        <Stack.Screen name="Iq2" component={Iq2} />
        <Stack.Screen name="Iq3" component={Iq3} />
        <Stack.Screen name="IqResult" component={IqResult} />

       

        <Stack.Screen name="Extraskills1" component={Extraskills1} />
        <Stack.Screen name="Extraskills2" component={Extraskills2} />
        <Stack.Screen name="Extraskills3" component={Extraskills3} />
        <Stack.Screen name="Extraskills4" component={Extraskills4} />

         <Stack.Screen name="Tutions1" component={Tution1} />
         <Stack.Screen name="Tutions2" component={Tution2} />
         <Stack.Screen name="Tutions3" component={Tution3} />



         <Stack.Screen name="BlogsScreen" component={BlogsScreen} />
<Stack.Screen name="BlogDetailScreen" component={BlogDetailScreen} />

         <Stack.Screen name="Collegecourse1" component={Collegecourse1} />
                  <Stack.Screen name="Collegecourse2" component={Collegecourse2} />
                  <Stack.Screen name="Collegecourse3" component={Collegecourse3} />
                  <Stack.Screen name="Collegecourse4" component={Collegecourse4} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
