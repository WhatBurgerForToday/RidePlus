import {
  Modal as ReactNativeModal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { api } from "~/utils/api";

type ModalProps = {
  text: "Bio" | "Rules" | "Capacity";
  visible: boolean;
  onClose: () => void;
  value: string;
  onChangeText: (text: string) => void;
};

export const Modal = (props: ModalProps) => {
  const { value, onChangeText, visible, onClose, text } = props;

  const utils = api.useContext();
  const editMutation = api.driver.editProfile.useMutation({
    onSuccess: () => {
      void utils.driver.profile.invalidate();
    },
  });

  const mutation = () => {
    onClose();
    if (text === "Capacity") {
      const intValue = parseInt(value);
      editMutation.mutate({ capacity: intValue });
      return;
    }
    editMutation.mutate({ [text.toLowerCase()]: value });
  };

  return (
    <ReactNativeModal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="justify-top mt-44 h-full rounded-t-3xl bg-amber-500 px-5 py-5">
        <Text className="px-2 py-2 text-xl font-bold">
          Edit Your {props.text}
        </Text>

        <TextInput
          editable
          multiline
          numberOfLines={10}
          onChangeText={onChangeText}
          value={value}
          className="text-md mx-2 rounded-lg bg-white px-5"
          placeholder={value}
        />

        <TouchableOpacity onPress={mutation}>
          <View className=" mx-2 my-4 w-28 flex-row items-center self-end rounded-lg bg-white px-6 py-2">
            <View className="pr-4">
              <AntDesign name="checkcircle" size={24} color="green" />
            </View>
            <Text className="font-bold">Edit</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ReactNativeModal>
  );
};
