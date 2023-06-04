import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useAtom, type PrimitiveAtom } from "jotai";

import { api } from "~/utils/api";

type ModalProps = {
  atom: PrimitiveAtom<boolean>;
  text: "Bio" | "Rules" | "Capacity";
  item: string;
  setItem: (item: string) => void;
};

export const Modals = (props: ModalProps) => {
  const [visible, setVisible] = useAtom(props.atom);
  const { item, setItem } = props;
  const utils = api.useContext();
  const editMutation = api.driver.editProfile.useMutation({
    onSuccess: () => {
      void utils.driver.profile.invalidate();
    },
  });
  const mutation = () => {
    setVisible(!visible);
    if (props.text === "Capacity") {
      const val = parseInt(item);
      editMutation.mutate({ capacity: val });
      return;
    }
    editMutation.mutate({ [props.text.toLowerCase()]: item });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(!visible);
      }}
    >
      <View className="justify-top mt-44 h-full rounded-t-3xl bg-amber-500 px-5 py-5">
        <Text className="px-2 py-2 text-xl font-bold">
          Edit Your {props.text}
        </Text>

        <TextInput
          editable
          multiline
          numberOfLines={10}
          onChangeText={setItem}
          value={item}
          className="text-md mx-2 rounded-lg bg-white px-5"
          placeholder={item}
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
    </Modal>
  );
};
