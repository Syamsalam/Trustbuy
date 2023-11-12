public class ENCODE {
    public static String doEncode(String str) {
        StringBuffer bf = new StringBuffer();
        for (int i = 0; i < str.length(); i++) {
            int count = 1;
            while (i < str.length() - 1 && str.charAt(i) == str.charAt(i + 1)) {
                count++;
                i++;
            }
            bf.append(str.charAt(i));
            bf.append(count);
            bf.append(" ");
        }
        return bf.toString();
    }

    public static String doDecode(String str) {
        StringBuffer bf = new StringBuffer();
        String[] arr = str.split(" ");
        for (int i = 0; i < arr.length; i += 2) {
            int count = Integer.parseInt(arr[i + 1]);
            while (count > 0) {
                bf.append(arr[i]);
                count--;
            }
        }
        return bf.toString();
    }

    public static void main(String[] args) {
        String str = "aaabbbcccd";
        System.out.println(doEncode(str));
        System.out.println(doDecode(doEncode(str)));

    }
}