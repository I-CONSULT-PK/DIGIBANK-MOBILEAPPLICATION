import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../../HomeScreen";
import OTP from "../OTP";

import Login from "../Login";
import Registration from "../Registration";
import Sidebar from "../../Sidebar";
import Card from "../../Card";
import AccountSetting from "../../AccountSetting";
import NameChange from "../../Namechange";
import PasswordChange from "../../PasswordChange";
import EmailChange from "../../EmailChange";
import MobNoChange from "../../Mob_NoChange";
import Nic_DateChange from "../../Nic_DateChange";
import WalletBeneficiary from "../../Select Beneficiary/WalletBeneficiary";
import BankBeneficiary from "../../Select Beneficiary/BankBeneficiary";
import AddBankBeneficiary from "../../Select Beneficiary/Add Beneficiary/AddBankBeneficiary";
import AddWalletBeneficiary from "../../Select Beneficiary/Add Beneficiary/AddWalletBeneficiary";
import History from "../../History";
import TopUp from "../../Bill & Top-Up/TopUp";
import SendMoney from "../../SendMoney";
import Scanner from "../../Scanner";
import EntitySelection from "../../EntitySelection";
import BillPaymentListing from "../../Bill & Top-Up/BillPaymentListing";
import BillPaymentTopUp from "../../Bill & Top-Up/BillPaymentTopUp";
import Domestic from "../../Send Money/Domestic";
import MyPayess from "../../Send Money/MyPayess";
import NewAccountAdd from "../../Send Money/NewAccountAdd";
import Transfer from "../../Send Money/Transfer";
import ForgetPassword from "../ForgetPassword";
import NewPassword from "../NewPassword";
import MyQRCode from "../../MyQrCode";
import OTPverification from "../../../components/OTPverification";
import ApplyForCard from "../../Mobile-Banking/My-Cards/ApplyForCard";
import NameOnTheCard from "../../Mobile-Banking/My-Cards/NameOnTheCard";
import NewCard from "../../Mobile-Banking/My-Cards/NewCard";
import ApplyCard from "../../Mobile-Banking/My-Cards/ApplyCard";
import CardManagement from "../../Mobile-Banking/My-Cards/Card-Management";
import CashUpCard from "../../Mobile-Banking/My-Cards/CashUpCard";
import CardActivation from "../../Mobile-Banking/My-Cards/CardActivation";
import SetCardPin from "../../Mobile-Banking/My-Cards/SetCardPin";
import CardActivated from "../../Mobile-Banking/My-Cards/CardActivated";

import CongCard from "../../Mobile-Banking/My-Cards/CongCard";
import SelectApplyOptionCard from "../../Mobile-Banking/My-Cards/SelectApplyOptionCard";
import SupplementaryCard from "../../Mobile-Banking/My-Cards/SupplementaryCard";
import SupplementaryCardCustomization from "../../Mobile-Banking/My-Cards/SupplementaryCardCustomization";
import SupplementaryCardLimitSplit from './../../Mobile-Banking/My-Cards/SupplementaryCardLimitSplit';
import ForgetUserName from "../ForgetUserName";

import SendBeneficiaryMoney from "../../Mobile-Banking/Beneficiary/SendBeneficiaryMoney";
import Add_Beneficiary from "../../Mobile-Banking/Beneficiary/Add-Beneficiary";
import Fatch_Acc_Beneficiary from "../../Mobile-Banking/Beneficiary/Fatch_Acc_Beneficiary";
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="ForgetUserName" component={ForgetUserName} />
        <Stack.Screen name="NewPassword" component={NewPassword} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="OTP" component={OTP} />
        <Stack.Screen name="EntitySelection" component={EntitySelection} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Sidebar" component={Sidebar} />
        <Stack.Screen name="Card" component={Card} />
        <Stack.Screen name="ApplyForCard" component={ApplyForCard} />
        <Stack.Screen name="NameOnTheCard" component={NameOnTheCard} />
        <Stack.Screen name="NewCard" component={NewCard} />
        <Stack.Screen name="SelectCards" component={SelectCards} />
        <Stack.Screen name="ApplyCard" component={ApplyCard} />
        <Stack.Screen name="CardManagement" component={CardManagement} />
        <Stack.Screen name="CashUpCard" component={CashUpCard} />
        <Stack.Screen name="CongCard" component={CongCard} />
        <Stack.Screen name="CardActivation" component={CardActivation} />
        <Stack.Screen name="SetCardPin" component={SetCardPin} />
        <Stack.Screen name="CardActivated" component={CardActivated} />
        <Stack.Screen
          name="SelectApplyOptionCard"
          component={SelectApplyOptionCard}
        />
        <Stack.Screen name="SupplementaryCard" component={SupplementaryCard} />
        <Stack.Screen
          name="SupplementaryCardCustomization"
          component={SupplementaryCardCustomization}
        />
        <Stack.Screen
          name="SupplementaryCardLimitSplit"
          component={SupplementaryCardLimitSplit}
        />

        <Stack.Screen name="AccountSetting" component={AccountSetting} />

        <Stack.Screen name="NumberChange" component={NameChange} />
        <Stack.Screen name="PasswordChange" component={PasswordChange} />
        <Stack.Screen name="EmailChange" component={EmailChange} />
        <Stack.Screen name="MobNoChange" component={MobNoChange} />

        <Stack.Screen name="Nic_DateChange" component={Nic_DateChange} />
        <Stack.Screen name="History" component={History} />

        <Stack.Screen name="MobNoChange" component={Nic_DateChange} />

        <Stack.Screen name="SendMoney" component={SendMoney} />
        <Stack.Screen name="Domestic" component={Domestic} />
        <Stack.Screen name="MyPayess" component={MyPayess} />
        <Stack.Screen name="NewAccountAdd" component={NewAccountAdd} />
        <Stack.Screen name="Transfer" component={Transfer} />

        <Stack.Screen name="WalletBeneficiary" component={WalletBeneficiary} />
        <Stack.Screen name="BankBeneficiary" component={BankBeneficiary} />
        <Stack.Screen name="AddWalletBeneficiary"component={AddWalletBeneficiary}/>
        <Stack.Screen name="AddBankBeneficiary" component={AddBankBeneficiary}
        />
        {/* <Stack.Screen name="SelectTopUp" component={SelectTopUp} /> */}
        <Stack.Screen name="TopUp" component={TopUp} />
        <Stack.Screen name="Scanner" component={Scanner} />
        <Stack.Screen name="MyQRCode" component={MyQRCode} />
        <Stack.Screen name="BillPaymentListing"component={BillPaymentListing}/>
        <Stack.Screen name="BillPaymentTopUp" component={BillPaymentTopUp} />
        <Stack.Screen name="OTPverification" component={OTPverification} />

        <Stack.Screen name="SendBeneficiaryMoney" component={SendBeneficiaryMoney}/>
        <Stack.Screen name="Add_Beneficiary" component={Add_Beneficiary}/>
        <Stack.Screen name="Fatch_Acc_Beneficiary" component={Fatch_Acc_Beneficiary}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
