import React, { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { api } from "~/utils/api";
import { DriverNavbar } from "~/components/Navbar/DriverNavbar";
import { RegisterItem } from "~/components/RegisterItem";

const RegisterPage = () => {
  const [filterInput, setFilterInput] = useState("");

  const approvedQuery = api.driver.approvedRider.useQuery();
  const pendingQuery = api.driver.pendingRider.useQuery();

  // filter
  const filteredApprovedItems =
    approvedQuery.data?.filter(
      ({ rider }) => filterInput === "" || rider.name.includes(filterInput),
    ) ?? [];
  const filteredPendingItems =
    pendingQuery.data?.filter(
      ({ rider }) => filterInput === "" || rider.name.includes(filterInput),
    ) ?? [];

  return (
    <>
      <View className="mb-5">
        <View className="pb-5 pl-7 pt-20">
          <Text className=" text-2xl font-bold text-amber-400">Register</Text>
        </View>

        <View className="flex items-center">
          <View className="w-5/6 flex-row place-items-center rounded-full bg-neutral-200 py-1.5">
            <View className="justify-center pl-5">
              <FontAwesome name="search" size={18} color="black" />
            </View>

            <TextInput
              onChangeText={setFilterInput}
              value={filterInput}
              className="text-md pl-5 text-neutral-500"
              placeholder="Find Passenger"
            />
          </View>
        </View>
      </View>

      <ScrollView className="relative">
        <View className="pb-3">
          <Text className="sticky top-0 mx-7 py-2 text-xl font-bold">
            Passengers
          </Text>
          {filteredApprovedItems.map((approvedItem) => (
            <RegisterItem
              key={approvedItem.id}
              type="driver-passengers"
              person={approvedItem.rider}
              {...approvedItem}
            />
          ))}
        </View>

        <View className="mb-5 mt-3 pb-3">
          <Text className="mx-7 py-2 text-xl font-bold">Pending</Text>
          {filteredPendingItems.map((pendingItem) => (
            <RegisterItem
              key={pendingItem.id}
              type="driver-pending"
              person={pendingItem.rider}
              {...pendingItem}
            />
          ))}
        </View>
      </ScrollView>
      <DriverNavbar />
    </>
  );
};

export default RegisterPage;
