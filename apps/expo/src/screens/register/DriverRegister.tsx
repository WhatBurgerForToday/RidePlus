import React from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { api, type RouterOutputs } from "~/utils/api";
import { Nav } from "~/components/Nav";
import { RegisterItem } from "~/components/RegisterItem";

type ApprovedRide = RouterOutputs["driver"]["approvedRider"];
type PendingRide = RouterOutputs["driver"]["pendingRider"];

export const DriverRegister = () => {
  const [text, onChangeText] = React.useState("");

  const approvedQuery = api.driver.approvedRider.useQuery();
  const pendingQuery = api.driver.pendingRider.useQuery();

  // filter
  let FILTER_APPROVEDITEMS: ApprovedRide = [];
  let FILTER_PENDITEMS: PendingRide = [];
  if (text === "") {
    FILTER_APPROVEDITEMS = approvedQuery.data ?? [];
    FILTER_PENDITEMS = pendingQuery.data ?? [];
  } else {
    if (!approvedQuery.isError && !approvedQuery.isLoading) {
      FILTER_APPROVEDITEMS = approvedQuery.data.filter(({ rider }) =>
        rider.name.includes(text),
      );
    }
    if (!pendingQuery.isError && !pendingQuery.isLoading) {
      FILTER_PENDITEMS = pendingQuery.data.filter(({ rider }) =>
        rider.name.includes(text),
      );
    }
  }

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
              onChangeText={onChangeText}
              value={text}
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
          {FILTER_APPROVEDITEMS.map(
            ({ id, departAt, source, desiredDestination, price, rider }) => (
              <RegisterItem
                key={id}
                id={id}
                type="driver-passengers"
                departAt={departAt}
                source={source}
                desiredDestination={desiredDestination}
                price={price}
                person={rider}
              />
            ),
          )}
        </View>

        <View className="mb-5 mt-3 pb-3">
          <Text className="mx-7 py-2 text-xl font-bold">Pending</Text>
          {FILTER_PENDITEMS.map(
            ({ id, departAt, source, desiredDestination, price, rider }) => (
              <RegisterItem
                key={id}
                id={id}
                type="driver-pending"
                departAt={departAt}
                source={source}
                desiredDestination={desiredDestination}
                price={price}
                person={rider}
              />
            ),
          )}
        </View>
      </ScrollView>
      <Nav />
    </>
  );
};
